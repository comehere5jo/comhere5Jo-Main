const express = require('express');
const router = express.Router();

const ManagerController = require('../controllers/manager.controller');
const managerController = new ManagerController();


// router.get('/', postsController.getPosts);
// router.post('/', postsController.createPost);

module.exports = router;