module.exports = {
    // Check if current user is valid user
    authenticate: function(req) {
        if(!req.session.user)
            return false;
        else return true;
    }
}