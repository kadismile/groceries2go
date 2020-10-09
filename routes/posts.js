var router = require('express').Router();
const Post = require('../models/Post')
const PostController = require('../controllers/postController')


router.get('',PostController.post_get_all);

router.post('/create', PostController.post_create);

router.get('/:postId', PostController.post_find_one);

router.patch('/:postId', PostController.post_update);

router.delete('/:postId',PostController.post_delete);


module.exports = router;