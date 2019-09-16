var mongoose = require('mongoose');
var ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    default: "/uploads/default.png"
  },
});
var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;