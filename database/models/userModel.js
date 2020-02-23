const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {type : Number, required: true},
  name: String,
  email: {type : String, unique: true, required: true},
  password: {type : String, required: true},
  address: Object,
  phone: String,
  website: String,
  company: Object,
  posts: Array,
  loggedin: {type: Boolean, default: false},
  token : {type: String, default: ''}
}, {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  });

// const userDB = mongoose.connection.useDb('user');
module.exports = mongoose.model('User', userSchema);