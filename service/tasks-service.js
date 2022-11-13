const todoListsService = require('./todolists-service');
const {mongoose} = require("mongoose");

class TasksService {
    async getTasks(todolists, tid) {
        const todoList = await todoListsService.getOneTodoList(todolists, tid);
        const tasks = todoList.tasks;
        return tasks;
    }

    async addTask(todolists, tid, title, describe) {
        const tasks = await this.getTasks(todolists, tid);
        const id = new mongoose.Types.ObjectId();
        const createAt = new Date();
        const task = {id, title, isDone: false, createAt, describe};
        const newTasks = [task, ...tasks];
        const update = await this.updateTasks(todolists, tid, newTasks);
        return update;
    }

    async removeTask(todolsits, tid, id) {
        const tasks = await this.getTasks(todolsits, tid);
        const newTasks = tasks.filter(t => t._id != id);
        const update = await this.updateTasks(todolsits, tid, newTasks);
        return update;
    }

    async updateOneTask(todolists, tid, task) {
        const tasks = await this.getTasks(todolists, tid);
        const newTasks = tasks.map(t => t._id == task.id
            ? {_id: t._id, title: task.title, isDone: task.isDone}
            : {_id: t._id, title: t.title, isDone: t.isDone}
        );
        const update = await this.updateTasks(todolists, tid, newTasks);
        return update;
    }

    async updateTasks(todolists, tid, newTasks) {
        const todoLists = await todoListsService.getTodoLists(todolists);
        const newTodoLists = todoLists.map(tl => ({
            _id: tl._id,
            title: tl.title,
            tasks: tl._id == tid ? newTasks : tl.tasks
        }));
        await todoListsService.updateTodoLists(todolists, newTodoLists);
        return await todoListsService.getTodoLists(todolists);
    }
}

module.exports = new TasksService();