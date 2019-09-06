const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

// const {clearHash} = require('../services/cache');

  const cleanCache = require('../middlewares/cleanCache');
module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    console.log(process.env, "env");
    // const redis = require('redis');

    // const redisUrl = 'redis://127.0.0.1:6379';

    // const client = redis.createClient(redisUrl);
    // const util = require('util'); // utility functions to use.

    // client.get = util.promisify(client.get);

    // const cachedBlogs = await client.get(req.user.id);

    // if(cachedBlogs){
    //   console.log('Serving from CAche' , cachedBlogs);
    //   return res.send(JSON.parse(cachedBlogs));
    // }


    const blogs = await Blog
    .find({ _user: req.user.id })
    .cache({key : req.user.id});

console.log("Serving from MongoDb");
    res.send(blogs);

    // client.set(req.user.id, JSON.stringify(blogs))
  });

  app.post('/api/blogs', requireLogin,cleanCache, async (req, res) => {
    // console.log(process.env, "env");
    console.log("first");
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
      console.log("2nd");
    } catch (err) {
      res.send(400, err);
    }

  });
};
