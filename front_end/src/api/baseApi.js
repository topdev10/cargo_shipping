import axios from 'axios';
import Config from '../config';

const BaseApi = {
    baseApi(params, callback) {
        axios.defaults.baseURL = Config.BACKEND_API_URL;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        const request = {
            url: params.sub_url,
            method: params.method,
            data: typeof params.data !== 'undefined' ? JSON.stringify(params.data) : {}
        };

        axios(request).then((res) => {
            if (callback) callback(res.status===200 ? null : res.status, res.data);
        }, (error) => {
            if (callback) callback(error, null);
        });
    },

    login(email, password, checked, callback) {
        let mData;
        if(this.validateEmail(email)){
            mData = {
                "email": email,
                "password": password
            };
        } else
            mData = {
                "username": email,
                "password": password
            };
        this.baseApi(
            {
                sub_url: 'auth/login',
                method: 'POST',
                data: mData
            },
            (err, res) => {
                if (err === null) {
                    if (res!= null) {
                        if(checked)
                        {
                            localStorage.user = JSON.stringify({email: res.email, username: res.username, token: res.token});
                        }
                        callback(null, {uemail: res.email, username: res.username, token: res.token});
                    } else callback(err, null);
                } else callback(err, null);
            }
        );
    },

    verifyToken(username, token, callback) {
        this.baseApi(
            {
                sub_url: 'auth/token',
                method: 'POST',
                data: {
                    username,
                    token
                },
            },
            (err, res) => {
                callback(err, res);
            }
        );
    },

    // Check if email form is correct or not
    validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    logout() {
        this.baseApi(
            {
                sub_url: 'auth/logout',
                method: 'POST',
                data: {}
            },
            (err, res) => {
                if (err === null) {
                    if (res!= null) {
                        localStorage.removeItem("user");
                    }
                }
            }
        );
    },

    signup(params, callback) {
        this.baseApi({
            sub_url: 'auth/signup',
            method: 'POST',
            data: params
        },
        (err, res) => callback(err, res));
    },

    verifyCode({code, email}, callback) {
        this.baseApi({
            sub_url: 'auth/verify',
            method: 'POST',
            data: {
                code,
                email,
            },
        },
        (err, res) => callback(err, res));
    },

    getProfile({username, email}, callback) {
        this.baseApi({
            sub_url: 'auth/getProfile',
            method: 'POST',
            data: {
                // email: JSON.parse(localStorage.getItem('user')).email,
                email,
                username
            }
        },
        (err, res) => callback(err, res));
    },

    updateProfile(profile, callback) {
        this.baseApi({
            sub_url: "auth/addprofile",
            method: 'POST',
            data: profile
        },
        (err, res) => callback(err, res));
    },

    updateAvatar(data, callback) {
        const formData = new FormData();
        formData.append('profileAvatar',data.avatar);
        formData.append('email', data.email);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("auth/uploadProfileImage",formData,config)
            .then((res) => {
                callback(null, res);
            }, (error) => {
                switch(error.status){
                case 401:
                    callback("Unauthorized Request", null);
                    break;
                case 426:
                    callback("Upload Avatar Failied", null);
                    break;
                default:
                    callback("Upload Avatar Failied", null);
                    break;
                }
            });
    },

    forgotPassword(email, callback){
        this.baseApi({
            sub_url: 'auth/forgotPassword',
            method: 'POST',
            data: {email}
        },
        (err, res) => callback(err, res));
    },

    resetPassword(email, password, cpassword, code, callback){
        this.baseApi({
            sub_url: 'auth/resetPassword',
            method: 'POST',
            data: {
                email,
                password,
                cpassword,
                code
            }
        },
        (err, res) => callback(err, res));
    },

    requestNewQuote(data, callback) {
        const formData = {
            email: JSON.parse(localStorage.user).email,
            name: data.shipmentName,
            submittedBy: JSON.parse(localStorage.user).username,
            freight: data.freightMethod,
            cargoReadyDate: data.pickupReadyDate,
            from: data.originPort,
            to: data.destPort,
            cargoDetails: data.description,
        };
        const config = {
            headers: {
                'authorization': `Bearer ${JSON.parse(localStorage.user).token}`
            }
        };
        
        axios.defaults.baseURL = Config.BACKEND_API_URL;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.post("/api/addQuote", formData, config)
            .then((res) => {
                callback(null, res);
            }, (error) => {
                callback(error, null);
            });
        // callback(null, true);
    },

    requestNewReport(report, callback) {
        callback(null, true);
    }
};

export default BaseApi;