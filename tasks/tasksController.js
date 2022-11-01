const getRefreshToken = require('../exeption/getRefreshToken');
const tasksService = require('../service/tasks-service');

class TasksController {
    async getTasks(req, res, next) {
        try {
            const tid = req.params.tid;
            const tasks = await tasksService.getTasks(getRefreshToken(req), tid);
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }

    async addTask(req, res, next) {
        try {
            const tid = req.params.tid;
            const title = req.body.title;
            const tasks = await tasksService.addTask(getRefreshToken(req), tid, title);
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }

    async removeTask(req, res, next) {
        try {
            const tid = req.params.tid;
            const id = req.params.id;
            const tasks = await tasksService.removeTask(getRefreshToken(req), tid, id);
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }

    async updateTask(req, res, next) {
        try {
            const tid = req.params.tid;
            const id = req.params.id;
            const title = req.body.title;
            const isDone = req.body.isDone;
            const tasks = await tasksService.updateOneTask(getRefreshToken(req), tid, {id, title, isDone});
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TasksController();