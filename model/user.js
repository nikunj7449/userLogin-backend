const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username : {type:String,required:true,unique: true},
  email: {type:String,required:true},
  password: {type:String,required:true},
  phone: {type:String,required:true},
  role: {type:String,require:true,enum:["admin","user"]}
})

userSchema.statics.validateLogin = async function (username, password, role) {
  const user = await this.findOne({ username});
  if (!user) return null;
  let isValid;
  try{
    const isPasswordVaild = await bcrypt.compare(password , user.password)
    if(isPasswordVaild){
      isValid = user.role === role;
    }
    
  }catch(err){
    console.log(err)
  }

  return isValid ? user : null;
};


module.exports = mongoose.model("User",userSchema)














// const { ObjectId } = require("mongodb");
// const {getDb} = require("../utils/dataBase")

// exports.User = class User {
//   constructor(username, email, phone, password) {
//     this.username = username;
//     this.email = email;
//     this.phone = phone;
//     this.password = password;
//   }

//   save() {
//     const Db = getDb();
//     return Db.collection("LoginUserData").insertOne(this);
//   }

//   static fetchAll() {
//     const Db = getDb();
//     return Db.collection("LoginUserData").find().toArray();
//   }

//   static findByUsername(username) {
//     const Db = getDb();
//     return Db.collection("LoginUserData").find({ username : username }).next();    
//   }

//   static deleteUserById(id) {
//     const Db = getDb();
//     return Db.collection("LoginUserData").deleteOne({ _id : new ObjectId(String(id))});
//   }
  
//   static editUserById(id, newData) {
//     const Db = getDb();
//     return Db.collection("LoginUserData").updateOne({ _id : new ObjectId(String(id))},{ $set : newData});
//   }

//   static validateLogin(username, password) {
//     const Db = getDb();
//     return Db.collection("LoginUserData").findOne({ username : username ,password : password});    
//   }
// };
