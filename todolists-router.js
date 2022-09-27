const express = require('express');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ' + Date.now());
    next();
});

router.get('/', async (req, res) => {
    res.send('TODO-LISTS');
});

module.exports = router;