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
                            console.log("return response", res, res.username);
                            localStorage.user = JSON.stringify({email, username: res.username});
                        }
                        callback(null, res);
                    } else callback(err, null);
                }
            }
        );
    },

    // Check if email form is correct or not
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    logout(callback) {
        this.baseApi(
            {
                sub_url: 'auth/logout',
                method: 'POST',
                data: {}
            },
            (err, res) => {
                if (err === null) {
                    if (res!= null) {
                        localStorage.user = null;
                        callback(null, res);
                    } else callback(err, null);
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
};

export default BaseApi;