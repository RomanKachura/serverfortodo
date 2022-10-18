const {TodoListsForUser, Todolist} = require("../schemas/schemas");

const getTodoForUser = async (uid) => {
    return await TodoListsForUser.findById('6349797bc488b6b87c1fab5f').then(res => {
        return res._doc.todolists;
    });
}

const addTodoForUser = async (uid, title) => {
    let todolists = await getTodoForUser(uid);
    const tl = new Todolist({title, tasks: []});
    tl.save();
    todolists = [tl, ...todolists];
    return TodoListsForUser.updateOne({_id: uid}, {todolists});
}

const deleteTodoForUser = async (uid, tid) => {
    let todolists = await getTodoForUser(uid);
    todolists = todolists.filter(f => f._id != tid);
    return TodoListsForUser.updateOne({_id: uid}, {todolists});
}

const updateTitleTodoForUser = async (uid, tid, title) => {
    let todolists = await getTodoForUser(uid);
    todolists = todolists.map(t => t._id != tid ? t : {_id: t._id, tasks: t.tasks, title});
    return TodoListsForUser.updateOne({_id: uid}, {todolists});
}


//Function for work with Tasks
const updateTasksInTodolist = async (uid, tid, tasks) => {
    let todolists = await getTodoForUser(uid);
    todolists = todolists.map(t => ({_id: t._id, title: t.title, tasks: t._id != tid ? t.tasks : tasks}));
    return TodoListsForUser.updateOne({_id: uid}, {todolists});
}

exports.getTodoForUser = getTodoForUser;
exports.addTodoForUser = addTodoForUser;
exports.deleteTodoForUser = deleteTodoForUser;
exports.updateTitleTodoForUser = updateTitleTodoForUser;
exports.updateTasksInTodolist = updateTasksInTodolist;