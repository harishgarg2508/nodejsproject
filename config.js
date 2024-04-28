const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb://localhost:27017/Login");
connect.then(()=>{
    console.log("Database connected")
})
.catch(()=>{
    console.log("Database not connected ")
});



//create a schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});





//second schema for contact


// const contactSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     mobile: {
//       type: String,
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     }
//   });
  

//create a collection

const collection = new mongoose.model('users', LoginSchema);
// const Contact = mongoose.model('Contact', contactSchema);


module.exports = collection;
// module.exports = Contact;