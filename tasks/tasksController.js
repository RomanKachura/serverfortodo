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
            const todolists = req.params.todolists;
            const title = req.body.title;
            const tasks = await tasksService.addTask(todolists, tid, title);
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }

    async removeTask(req, res, next) {
        try {
            const tid = req.params.tid;
            const todolists = req.params.todolists;
            const id = req.params.id;
            const resolve = await tasksService.removeTask(todolists, tid, id);
            return res.json(resolve);
        } catch (e) {
            next(e);
        }
    }

    async updateTask(req, res, next) {
        try {
            const tid = req.params.tid;
            const todolists = req.params.todolists;
            const id = req.params.id;
            const title = req.body.title;
            const isDone = req.body.isDone;
            const describe = req.body.describe;
            const tasks = await tasksService.updateOneTask(todolists, tid, {id, title, describe, isDone});
            return res.json(tasks);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TasksController();