// postController.js에서 요청을 받아서 DB에 접근하는 로직을 처리하는 파일
const { Post } = require('../models');

const create = async (title, description, category) => {
    try {
        const post = await Post.create({
            title: title,
            description: description,
            category: category
        });
    } catch (err) {
        console.error("postService.create error");
        throw err;
    }
};
const getOne = async (id) => {
    try {
        const post = await Post.findOne({
            where: {
                id: id
            }
        }
        );
        console.log(post);
        return post;
    } catch (err) {
        console.error("postService.getOne error");
        throw err;
    }
};

const getAll = async () => {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch (err) {
        console.error("postService.getAll error");
        throw err;
    }
};



const update = async (id, title, description, category) => {
    try {
        let post = await Post.findOne({
            where: {
                id: id
            }
        });
        post.title = title;
        post.description = description;
        post.category = category;
        await post.save();
    } catch (err) {
        console.error("postService.update error");
        throw err;
    }
};



const deletes = async (id) => {
    try {
        const post = await Post.findOne({
            where: {
                id: id
            }
        });
        await post.destroy();
    } catch (err) {
        console.error("postService.delete error");
        throw err;
    }
}

module.exports = {
    getAll,
    getOne,
    update,
    create,
    deletes
};