const todolistsService = require('../service/todolists-service');
const getRefreshToken = require('../exeption/getRefreshToken');

class todolistsController {
    async getTodoLists(req, res, next) {
        try {
            const tl = await todolistsService.getTodoLists(req.params.todolists);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async addTodoList(req, res, next) {
        try {
            const title = req.body.title;
            const todolists = req.params.todolists;
            console.log(`addTodoList ${todolists}`)
            const tl = await todolistsService.addTodoList(todolists, title);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async removeTodoList(req, res, next) {
        try {
            const id = req.params.id;
            const todolists = req.params.todolists;
            const tl = await todolistsService.removeTodoList(todolists, id);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async updateTitleTodoList(req, res, next) {
        try {
            const id = req.params.id;
            const todolists = req.params.todolists;
            const title = req.body.title;
            const tl = await todolistsService.updateTitleTodoList(todolists, id, title);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new todolistsController();