const mongoose = require('mongoose');
const dotEnv = require('dotenv')
dotEnv.config();
module.exports = async () => {
  try {
    // console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    console.log('Viewwe DB Connected');
  } catch (error) {
    console.log('Viewer DB Connectivity Error', error);
    throw new Error(error.message);
  }
}
