const userService = require('./user-service');
const {TodoListsForUser} = require('../schemas/schemas');
const {mongoose} = require("mongoose");

class TodolistsService {
    async getTodoLists(refreshToken) {
        const user = await userService.getUser(refreshToken);
        const tid = user.todolists.toString();
        const todolists = await TodoListsForUser.findById(tid);
        const tl = todolists.todolists;
        return tl;
    }

    async getOneTodoList(refreshToken, id) {
        const todolists = await this.getTodoLists(refreshToken);
        const tl = todolists.find(t => t._id == id);
        return tl;
    }

    async addTodoList(refreshToken, title) {
        const todolists = await this.getTodoLists(refreshToken);
        const id = new mongoose.Types.ObjectId();
        const createAt = new Date();
        const tl = {id, title, tasks: [], createAt};
        const newTodoLists = [tl, ...todolists];
        return await this.updateTodoLists(refreshToken, newTodoLists);
    }

    async removeTodoList(refreshToken, id) {
        const todolists = await this.getTodoLists(refreshToken);
        const newTodoLists = todolists.filter(t => t._id != id);
        console.log(newTodoLists)
        return await this.updateTodoLists(refreshToken, newTodoLists);
    }

    async updateTitleTodoList(refreshToken, id, title) {
        const todolists = await this.getTodoLists(refreshToken);
        const newTodoLists = todolists.map(t => ({_id: t._id, tasks: t.tasks, title: t._id == id ? title : t.title}));
        return await this.updateTodoLists(refreshToken, newTodoLists);
    }

    async updateTodoLists(refreshToken, todolists) {
        const user = await userService.getUser(refreshToken);
        const tid = user.todolists.toString();
        const update = await TodoListsForUser.updateOne({_id: tid}, {todolists});
        return update;
    }
}

module.exports = new TodolistsService();