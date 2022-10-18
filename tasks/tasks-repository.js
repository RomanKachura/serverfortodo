const {TodoListsForUser, Task} = require("../schemas/schemas");
const {getTodoForUser, updateTasksInTodolist} = require("../todolists/todolists-repository");
const getTasksForUser = async (uid, tid) => {
    return await TodoListsForUser.findById(uid).then(res => {
        return res._doc.todolists.find(f => f._id == tid).tasks;
    });
}

const deleteTaskForUser = async (uid, tid, id) => {
    let tasks = await getTasksForUser(uid, tid);
    tasks = tasks.filter(t => t._id != id);
    return updateTasksInTodolist(uid, tid, tasks);
}

const addTaskForUser = async (uid, tid, title) => {
    let tasks = await getTasksForUser(uid, tid);
    let task = new Task({title, isDone: false});
    task.save();
    tasks = [{_id: task._id, title: task.title, isDone: task.isDone}, ...tasks];
    return updateTasksInTodolist(uid, tid, tasks);
}

const updateTaskForUser = async (uid, tid, id, task) => {
    let tasks = await getTasksForUser(uid, tid);
    tasks = tasks.map(t => ({
        _id: t._id,
        title: t._id != id ? t.title : task.title,
        isDone: t._id != id ? t.isDone : task.isDone
    }));
    return updateTasksInTodolist(uid, tid, tasks);

}

exports.getTasksForUser = getTasksForUser;
exports.deleteTaskForUser = deleteTaskForUser;
exports.addTaskForUser = addTaskForUser;
exports.updateTaskForUser = updateTaskForUser;