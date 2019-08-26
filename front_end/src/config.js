class Config {
    constructor() {
        this.config = {};
        this.configReady = false;
        this.BACKEND_API_URL = "http://localhost:8000/";
        this.PUSHER_APP_ID = "816490";
        this.PUSHER_KEY = "c1e8287dcfffa09fb222";
        this.PUSHER_SECRET = "bf59162b3db62f87b709";
        this.PUSHER_CLUSTER = "us2";
        // Google Map Api Key
        this.GOOGLE_PUBLIC_KEY = "AIzaSyAUGOfGa77GnAfbab7gUjuUk86YR8TkLIQ";
    }
}

export default (new Config());