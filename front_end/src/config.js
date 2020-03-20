class Config {
    constructor() {
        this.config = {};
        this.configReady = false;
        // Deploy Url
        this.BACKEND_API_URL = "http://ec2-35-182-231-236.ca-central-1.compute.amazonaws.com:8000/";
        // Local Url
        // this.BACKEND_API_URL = "http://localhost:8000/";
        this.PUSHER_APP_ID = "863077";
        this.PUSHER_KEY = "Your Pusher Key";
        this.PUSHER_SECRET = "Your Pusher Secret";
        this.PUSHER_CLUSTER = "mt1";
        this.PUSHER_CHANNEL = "customer";
        // Google Map Api Key
        this.GOOGLE_PUBLIC_KEY = "Your Google Api Key";
        this.LINKEDIN_CLIENT_ID_LIVE = "LinkedinClient_Live";
        this.LINKEDIN_CLIENT_ID_LOCAL = "LinkedinLocal";
        this.LINKEDIN_REDIRECT_URL_LOCAL = "http%3A%2F%2Flocalhost%3A8000%2Fauth%2Flinkedin";
        this.LINKEDIN_REDIRECT_URL_DEPLOY = "redirect url";
        // Stripe Payment
        this.STRIPE_PUBLIC_KEY = "stripe key";
    }
}

export default (new Config());
