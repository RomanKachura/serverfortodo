const {mongoose, Schema, model} = require("mongoose");

const UsersSchema = Schema({
    userName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    todolists: mongoose.ObjectId
});
const TaskSchema = Schema({
    title: String,
    isDone: Boolean
});
const TodoListSchema = Schema({
    title: String,
    tasks: [TaskSchema]
});

const TodoListsForUserSchema = Schema({
    todolists: [TodoListSchema]
});

const User = model('users', UsersSchema);
const TodoListsForUser = model('newtodolists', TodoListsForUserSchema);
const Todolist = model('todolist', TodoListSchema);
const Task = model('task', TaskSchema);

exports.UsersSchema = UsersSchema;
exports.TaskSchema = TaskSchema;
exports.TodoListSchema = TodoListSchema;
exports.TodoListsForUserSchema = TodoListsForUserSchema;

exports.User = User;
exports.TodoListsForUser = TodoListsForUser;
exports.Todolist = Todolist;
exports.Task = Task;