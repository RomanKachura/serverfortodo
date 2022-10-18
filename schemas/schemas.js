const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    todolists: Object
});
const TaskSchema = mongoose.Schema({
    title: String,
    isDone: Boolean
});
const TodoListSchema = mongoose.Schema({
    title: String,
    tasks: [TaskSchema]
});

const TodoListsForUserSchema = mongoose.Schema({
    todolists: [TodoListSchema]
});

const Users = mongoose.model('users', UsersSchema);
const TodoListsForUser = mongoose.model('newtodolists', TodoListsForUserSchema);
const Todolist = mongoose.model('todolist', TodoListSchema);
const Task = mongoose.model('task', TaskSchema);

exports.UsersSchema = UsersSchema;
exports.TaskSchema = TaskSchema;
exports.TodoListSchema = TodoListSchema;
exports.TodoListsForUserSchema = TodoListsForUserSchema;

exports.Users = Users;
exports.TodoListsForUser = TodoListsForUser;
exports.Todolist = Todolist;
exports.Task = Task;