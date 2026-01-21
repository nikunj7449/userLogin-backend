const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const DataBaseURL = "mongodb+srv://nikunj:nikunj@userlogin.eqbljb0.mongodb.net/?appName=UserLogin"

let _db;

const MongoDbConnect = (callback)=>{
    mongoClient.connect(DataBaseURL)
    .then((client)=>{
        callback();
        _db = client.db("UserLoginDB");
        console.log("Connected to DB successfully");
    })
    .catch((err)=>{
        console.log("Error in DB connection");
        console.log(err);
    });

}

const getDb = ()=>{
    if(!_db){
        throw new Error("Database not initialized");
    }
    return _db;
}

exports.getDb = getDb;
exports.MongoDbConnect = MongoDbConnect;