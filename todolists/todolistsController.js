const todolistsService = require('../service/todolists-service');
const getRefreshToken = require('../exeption/getRefreshToken');

class todolistsController {
    async getTodoLists(req, res, next) {
        try {
            const tl = await todolistsService.getTodoLists(getRefreshToken(req));
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async addTodoList(req, res, next) {
        try {
            const title = req.body.title;
            const tl = await todolistsService.addTodoList(getRefreshToken(req), title);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async removeTodoList(req, res, next) {
        try {
            const id = req.params.id;
            const tl = await todolistsService.removeTodoList(getRefreshToken(req), id);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }

    async updateTitleTodoList(req, res, next) {
        try {
            const id = req.params.id;
            const title = req.body.title;
            const tl = await todolistsService.updateTitleTodoList(getRefreshToken(req), id, title);
            res.json(tl);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new todolistsController();