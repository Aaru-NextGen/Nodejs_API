const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {type : String, unique: true, required: true},
  password: {type : String, required: true},
  loggedin: {type: Boolean, default: false},
  token : {type: String, default: ''}
}, {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.loggedin;
        delete ret.__v;
        return ret;
      }
    }
  });

module.exports = mongoose.model('admin', adminSchema);