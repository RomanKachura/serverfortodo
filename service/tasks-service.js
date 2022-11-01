const todoListsService = require('./todolists-service');
const {mongoose} = require("mongoose");

class TasksService {
    async getTasks(refreshToken, tid) {
        const todoList = await todoListsService.getOneTodoList(refreshToken, tid);
        const tasks = todoList.tasks;
        return tasks;
    }

    async addTask(refreshToken, tid, title) {
        const tasks = await this.getTasks(refreshToken, tid);
        const id = new mongoose.Types.ObjectId();
        const task = {id, title, isDone: false};
        const newTasks = [task, ...tasks];
        const update = await this.updateTasks(refreshToken, tid, newTasks);
        return update;
    }

    async removeTask(refreshToken, tid, id) {
        const tasks = await this.getTasks(refreshToken, tid);
        const newTasks = tasks.filter(t => t._id != id);
        const update = await this.updateTasks(refreshToken, tid, newTasks);
        return update;
    }

    async updateOneTask(refreshToken, tid, task) {
        console.log(task);
        const tasks = await this.getTasks(refreshToken, tid);
        const newTasks = tasks.map(t => t._id == task.id
            ? {_id: t._id, title: task.title, isDone: task.isDone}
            : {_id: t._id, title: t.title, isDone: t.isDone}
        );
        const update = await this.updateTasks(refreshToken, tid, newTasks);
        return update;
    }

    async updateTasks(refreshToken, tid, newTasks) {
        const todoLists = await todoListsService.getTodoLists(refreshToken);
        const newTodoLists = todoLists.map(tl => ({
            _id: tl._id,
            title: tl.title,
            tasks: tl._id == tid ? newTasks : tl.tasks
        }));
        const update = await todoListsService.updateTodoLists(refreshToken, newTodoLists);
        return update;
    }
}

module.exports = new TasksService();