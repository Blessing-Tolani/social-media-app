import express from 'express';
const {getPosts, addPost, editPost, removePost, getPost} = require('../controllers/posts')

const router = express.Router();

router.route('/').get(getPosts).post(addPost)
router.route('/:id').delete(removePost).put(editPost).get(getPost)


module.exports = router;