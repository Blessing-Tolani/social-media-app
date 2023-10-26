import { Post } from "../types/posts";

const fs = require('fs').promises;
const path = require('path');

const postsFilePath = path.join(__dirname, '../../db/posts.json');

const getAllPosts = async () => JSON.parse(await fs.readFile(postsFilePath))

const getPost = async (id: number) => {
    const posts: Post[] = await getAllPosts();
    return posts.find((post) => post.id === id)
}

const savePost = async (post: Post) => {
    const posts = await getAllPosts();
    post.id = posts.length + 1;
    posts.push(post);

    await fs.writeFile(postsFilePath, JSON.stringify(posts), () => {
        console.log('Post saved')
    });

    return post;

}

const updatePost = async (id:number, editPost: Post) => {
    const posts: Post[] = await getAllPosts();
    editPost.id = id;
    const updatedPosts = posts.map(post => post.id === id ? editPost : post);
    await fs.writeFile(postsFilePath, JSON.stringify(updatedPosts), () => {
        console.log('Post updated successfully')
    });
}

const deletePost = async(id:number) => {
    const posts: Post[] = await getAllPosts();
    const newPosts = posts.filter(post => post.id !== id)
    await fs.writeFile(postsFilePath, JSON.stringify(newPosts), () => {
        console.log('Post deleted successfully')
    });
    return newPosts;
}



module.exports = {
    getAllPosts, savePost, getPost, updatePost, deletePost
}