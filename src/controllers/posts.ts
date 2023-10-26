const service = require('../services/posts.ts')

const postExists = async (req: any, res: any, next: any) => {
    const post = await service.getPost(parseInt(req.params.id));
  
    if (post === undefined) {
      const err = new Error("Post not found");
      // err.statusCode = 404;
      next(err);
    } else {
      res.locals.post = post;
      next();
    }
  };

const getPosts =  async (req: any, res: { json: (arg0: { message: string; posts: any; }) => void; }, next: (arg0: any) => void) => {
    try {
        res.json({
            message: 'Successful',
            posts: await service.getAllPosts()
        })
    }
    catch(error){
        next(error)
    }
}

const getPost = async (req: any, res:any, next: any) => {
    try {
        const post = await service.getPost(parseInt(req.params.id));
        if (post === undefined) {
            const err: any = new Error("Aww, Post not found");
            err.statusCode = 404;
             next(err);
          } else {
            res.json({
                message: 'Successful',
                post
            })
            next();
          }
    
    }
    catch(error){
        next(error)
    }
}

const addPost = async (req: any, res: { json: (arg0: { message: string; posts: any; }) => void; }, next: (arg0: any) => void) => {
    try {
        const {body, title, userId, tags, reactions} = req.body
    
        const post = {
    body, title, userId, tags, reactions
        }
        res.json({
            message: 'Successfully added',
            posts: await service.savePost(post)
        })
    }
    catch(error){
        next(error)
    }
}

const editPost = async (req: any, res: any, next: any) => {
    try {
      const {body, title, userId, tags, reactions} = req.body

      const updated = await service.updatePost(parseInt(req.params.id), {
        body, title, userId, tags, reactions
      });
  
      res.json({ message: 'Successfully updated', data: updated });
    } catch (error) {
      next(error);
    }
  };

  const removePost = async (req: any, res: any, next: any) => {
    try {

      const {body, title, userId, tags, reactions} = req.body

      const updated = await service.deletePost(parseInt(req.params.id), {
        body, title, userId, tags, reactions
      });
  
      res.json({ message: 'Successfully deleted', data: updated });
    } catch (error) {
      next(error);
    }
  };

module.exports = {getPosts, addPost, editPost, removePost, getPost}