const userService = require('./user-service');
const {TodoListsForUser} = require('../schemas/schemas');
const {mongoose} = require("mongoose");

class TodolistsService {
    async getTodoLists(todolists) {
        const tl = await TodoListsForUser.findById(todolists);
        return tl.todolists;
    }

    async getOneTodoList(todolists, id) {
        const tls = await this.getTodoLists(todolists);
        const tl = tls.find(t => t._id == id);
        return tl;
    }

    async addTodoList(todolists, title) {
        const tls = await this.getTodoLists(todolists);
        const id = new mongoose.Types.ObjectId();
        const createAt = new Date();
        const tl = {id, title, tasks: [], createAt};
        const newTodoLists = [tl, ...tls];
        await this.updateTodoLists(todolists, newTodoLists);
        return await this.getTodoLists(todolists);
    }

    async removeTodoList(todolists, id) {
        const tl = await this.getTodoLists(todolists);
        const newTodoLists = tl.filter(t => t._id != id);
        await this.updateTodoLists(todolists, newTodoLists);
        return await this.getTodoLists(todolists);
    }

    async updateTitleTodoList(todolists, id, title) {
        const tl = await this.getTodoLists(todolists);
        const newTodoLists = tl.map(t => ({_id: t._id, tasks: t.tasks, title: t._id == id ? title : t.title}));
        await this.updateTodoLists(todolists, newTodoLists);
        return await this.getTodoLists(todolists);
    }

    async updateTodoLists(tid, todolists) {
        const update = await TodoListsForUser.updateOne({_id: tid}, {todolists});
        return update;
    }
}

module.exports = new TodolistsService();