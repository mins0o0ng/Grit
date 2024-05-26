// 게시판 글 작성 시 사용
const express = require('express');
const router = express.Router();
const postService = require('./postService');

const createPost = async(req, res, next) => {
    try {
        const { title, description, category } = req.body;
        console.log(`createPost - title: ${title}, description: ${description}, category: ${category}`);   
        await postService.create(title, description, category);
        res.status(200).json({title, description, category});
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getPost = async(req, res, next) => {
    try {
        const id  = parseInt(req.params.id); // URL 매개변수에서 id 가져오기
        console.log(`getPost - id: ${id}`);
        const post = await postService.getOne(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        console.log('getAllPosts');
        const posts = await postService.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404);
        next(err);
    }
};


const updatePost = async(req, res, next) => {
    try{
        const { id, title, description, category} = req.body;
        console.log(`updatePost - id: ${id}, title: ${title}, description: ${description}, category: ${category}`);
        await postService.update(id, title, description, category);
        res.status(200).json({id, title, description, category});
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const deletePost = async(req, res, next) => {
    try {
        // console.log(req.body);
        const { id } = req.body;
        console.log(`deletePost - postId: ${id}`);
        await postService.deletes(id);
        res.status(200).json({id});
    } catch (err) {
        res.status(404);
        next(err);
    }
};

router.get('/getAll', getAllPosts);
router.get('/getOne/:id', getPost);
router.post('/postUpdate', updatePost);
router.post('/postCreate', createPost);
router.post('/postDelete', deletePost);

module.exports = router;