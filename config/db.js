const mongoose = require('mongoose');

const connectDB = async ()  => {
    try {
      mongoose.set("strictQuery", false) 
      mongoose.connect(process.env.MONGO_URI) 
      console.log("Vous êtes connect a mongoDB !!!!!");
    } catch (error) {
        console.log("Voice l'error", error);
        process.exit();
    }
}

module.exports = connectDB;