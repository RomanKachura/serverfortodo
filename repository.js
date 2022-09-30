const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
    title: String,
    isDone: Boolean
});
const TodoListSchema = mongoose.Schema({
    title: String,
    tasks: [TaskSchema]
});

const TodoList = mongoose.model('todolist', TodoListSchema);

const getTodoLists = () => {
    return TodoList.find();
}

const addTodoList = (title) => {
    const todolist = new TodoList({title: title, tasks: []});
    return todolist.save();
}

const deleteTodoList = (id) => TodoList.deleteOne({_id: id});
const updateTodoList = (id, title) => TodoList.updateOne({_id: id}, {title});

exports.getTodoLists = getTodoLists;
exports.addTodoList = addTodoList;
exports.deleteTodoList = deleteTodoList;
exports.updateTodoList = updateTodoList;