const mongoose = require("mongoose");
//Schemas
const TaskSchema = mongoose.Schema({
    title: String,
    isDone: Boolean
});
const TodoListSchema = mongoose.Schema({
    title: String,
    tasks: [TaskSchema]
});

const TodoList = mongoose.model('todolist', TodoListSchema);
const Task = mongoose.model('task', TaskSchema);

//Functions for work with TodoLists
const getOneTodoList = (id) => {
    return TodoList.find({_id: id});
};
const getTodoLists = () => {
    return TodoList.find();
};
const addTodoList = (title) => {
    const todolist = new TodoList({title: title, tasks: []});
    return todolist.save();
};
const deleteTodoList = (id) => TodoList.deleteOne({_id: id});
const updateTodoList = (id, title) => TodoList.updateOne({_id: id}, {title});

//Functions for work with Tasks
const getArrayTasks = async (tID) => {
    let tasks;
    await TodoList.findById(tID).then(res => {
        tasks = res.tasks;
    });

    tasks = tasks.map(t => ({_id: t._id, title: t.title, isDone: t.isDone}));
    return tasks;
}
const getOneTask = async (tID, id) => {
    const tl = await TodoList.findById(tID).then(async (res) => {
        const task = await res.tasks.find(t => t._id == id);
        return task;
    });
    return tl;
};
const getTasks = async (tID) => {
    const tasks = await TodoList.findById(tID).then(async res => {
        return await res.tasks;
    });
    return tasks;
};
const changeTask = async (tID, id, reqTask) => {
    let tasks = await getArrayTasks(tID);

    try {
        tasks = tasks.map(t => t._id != id ? {_id: t._id, title: t.title, isDone: t.isDone} : {
            _id: t._id,
            title: reqTask.title,
            isDone: reqTask.isDone
        });

        return TodoList.updateOne({_id: tID}, {tasks});
    } catch (e) {
        console.error(e);
        throw e;
    }

};
const deleteTask = async (tID, id) => {
    let tasks = await getArrayTasks(tID);
    try {
        tasks = tasks.filter(f => f._id != id);
        return TodoList.updateOne({_id: tID}, {tasks});
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const addTask = async (tID, task) => {
    console.log(task)
    let tasks = await getArrayTasks(tID);
    let newTask = new Task({title: task.title, isDone: task.isDone});
    newTask.save();
    tasks = [newTask, ...tasks];
    return TodoList.updateOne({_id: tID}, {tasks});
};


exports.getOneTask = getOneTask;
exports.getTasks = getTasks;
exports.changeTask = changeTask;
exports.deleteTask = deleteTask;
exports.addTask = addTask;

exports.getOneTodoList = getOneTodoList;
exports.getTodoLists = getTodoLists;
exports.addTodoList = addTodoList;
exports.deleteTodoList = deleteTodoList;
exports.updateTodoList = updateTodoList;