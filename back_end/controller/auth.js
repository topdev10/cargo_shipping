const User = require('../model/user');

module.exports = {
    // Check if current user is valid user
    authenticate: function(email, token, callback) {
        User.findOne({email, token}, (err, res) => {
            if(err) callback(err, null)
            else if(res) callback(null, res)
            else callback("UnAuthrized", null)
        });
    },
    authenticate: function(req) {
        if(!req.session.user)
            return false;
        else return true;
    }
}