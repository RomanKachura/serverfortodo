const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    todolists: String
});
const Users = mongoose.model('users', UsersSchema);
let user = null;

//Function for work with Users
const getUser = (id) => {
    return Users.find({_id: id});
}

exports.getUser = getUser;
