express = require("express");
const router = express.Router();
const postModel = require("../Models/post");

// CREATE a new post
router.post("/", async (req, res, next) => {
    try {
        const { body } = req;
        const { title, content } = body;

        const post = new postModel({
            title: title,
            content: content,
        });

        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//  GET all posts
router.get("/", async (req, res, next) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error.message });
    }
});

//  GET one post
router.get("/:id", getPost, (req, res, next) => {
    res.json(res.post);
});

//  DELETE one post
router.delete("/:id", getPost, async (req, res, next) => {
    try {
        const deletedpost = await res.post.remove();
        res.json(deletedpost);
    } catch (error) {
        res.jason({ message: error.message });
    }
});

//  UPDATE one post
router.patch("/:id", getPost, async (req, res, next) => {
    try {
        const { body } = req;
        const { title, content } = body;
        res.post.title = title;
        res.post.content = content;

        const updatedpost = await res.post.save();
        res.json(updatedpost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

//  Search user by name
router.get("/searchBy/title", async (req, res, next) => {
    try {
        const posts = await postModel.find();
        const { body } = req;
        const { title } = body;

        if (posts.some((post) => post.title === title)) {
            res.json(posts.filter((post) => post.title === title));
        } else {
            res.json({
                message: `no post found with the title of ${title}`,
            });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

//  通过ID得到用户的一个中间件
async function getPost(req, res, next) {
    let post;
    try {
        post = await postModel.findById(req.params.id);
        if (post == null) {
            return res.json({ message: "no post found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    res.post = post;
    next();
}

module.exports = router;
