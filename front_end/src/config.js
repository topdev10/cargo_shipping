class Config {
    constructor() {
        this.config = {};
        this.configReady = false;
        // Deploy Url
        // this.BACKEND_API_URL = "http://ec2-35-182-231-236.ca-central-1.compute.amazonaws.com:8000/";
        // Local Url
        this.BACKEND_API_URL = "http://localhost:8000/";
        this.PUSHER_APP_ID = "863077";
        this.PUSHER_KEY = "2ea31d0b05f2da4caf6e";
        this.PUSHER_SECRET = "7b5538b61ee06197ad3f";
        this.PUSHER_CLUSTER = "mt1";
        this.PUSHER_CHANNEL = "customer";
        // Google Map Api Key
        this.GOOGLE_PUBLIC_KEY = "AIzaSyAUGOfGa77GnAfbab7gUjuUk86YR8TkLIQ";
        this.LINKEDIN_CLIENT_ID = "86w9dm8at7hfq5";
        this.LINKEDIN_REDIRECT_URL_LOCAL = "http%3A%2F%2Flocalhost%3A8000%2Fauth%2Flinkedin";
        this.LINKEDIN_REDIRECT_URL_DEPLOY = "http%3A%2F%2Fec2-35-182-231-236.ca-central-1.compute.amazonaws.com%2Fauth%2Flinkedin";
        // Stripe Payment
        this.STRIPE_PUBLIC_KEY = "pk_test_mfCPqZtW4If6nVmSF2Ahv2xp0013VlcByR";
    }
}

export default (new Config());