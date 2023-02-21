const mongoose = require('mongoose');

mongoose.set("strictQuery", false); 
mongoose.connect("mongodb://localhost:27017/node", () => {
    console.log("Connected to Mongo");
});

module.exports = {
    mongoose
};