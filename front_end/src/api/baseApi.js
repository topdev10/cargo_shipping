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

    login(email, password, callback) {
        this.baseApi(
            {
                sub_url: 'auth/login',
                method: 'POST',
                data: {
                    "email": email,
                    "password": password
                }
            },
            (err, res) => {
                if (err === null) {
                    if (res!= null) {
                        localStorage.user = JSON.stringify({email, password});
                        callback(null, res);
                    } else callback(err, null);
                }
            }
        );
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