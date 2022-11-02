const {mongoose, Schema, model} = require("mongoose");

const UsersSchema = Schema({
    userName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    todolists: {type: Schema.Types.ObjectId}
});

const TokenSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, require: true}
});

const TaskSchema = Schema({
    title: String,
    describe: String,
    isDone: Boolean,
    createAt:Date
});
const TodoListSchema = Schema({
    title: String,
    createAt:Date,
    tasks: [TaskSchema]
});

const TodoListsForUserSchema = Schema({
    todolists: [TodoListSchema]
});

const User = model('users', UsersSchema);
const Token = model('token', TokenSchema);
const TodoListsForUser = model('newtodolists', TodoListsForUserSchema);

exports.UsersSchema = UsersSchema;
exports.Token = Token;
exports.TaskSchema = TaskSchema;
exports.TodoListSchema = TodoListSchema;
exports.TodoListsForUserSchema = TodoListsForUserSchema;

exports.User = User;
exports.TodoListsForUser = TodoListsForUser;
