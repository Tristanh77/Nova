const Post = require('../models/post');

module.exports = {
    create,
    index,
    deletePost
}

async function create(req, res){
	console.log(req.body, '<-- req.body')
    console.log(req.user, '<-- req.user')
		  try {
			const post = await Post.create({
				caption: req.body.caption,
				user: req.user, 
				photoUrl: req.body.photoUrl 
			})
			await post.populate('user'); 
			res.status(201).json({data: post}) 
		  } catch(err){
			res.status(400).json({error: err})
		  }
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts: posts})
    } catch(err){
    }
}
async function deletePost(req, res){
    try {
        console.log('remove post')
        const post = await Post.findOne({'post._id': req.params.id, 'post.username': req.user.username});
        post.remove(req.params.id) 
        await post.save() 
        res.json({data: 'post removed'})
    } catch(err){
        res.status(400).json({err})
    }
}