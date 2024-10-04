const router = require('express').Router()
const withAuth = require('../utils/auth')

const {Post, Comment, User} = require('../models')


router.get('/', async (req,res)=> {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content']
                }
            ]
    })
    const posts = postData.map((post) => post.get({plain: true}))
    
    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in 
    })
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/login', (req,res)=>{
    if(req.session.logged_in){
        res.redirect('/')
        return;
    }else{
        res.render('login')
    }
})
router.get('/signup', (req,res)=>{
    res.render('signup')
})




router.get('/dashboard',withAuth, async (req,res)=> {
    try{
        const getPost = await Post.findAll({
            where: {
                author_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const posts = getPost.map((post)=> post.get({plain:true}))
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    })
}catch(err){
    res.status(500).json(err)
}
})
router.get('/newpost', (req,res)=> {
    res.render('newpost',{
        logged_in: req.session.logged_in
    })
})

router.get('/post/:id',withAuth, async (req,res) => {
    try{
     const posts = await Post.findOne( {
         where: {
             id: req.params.id
         },
         include: [
             {
                 model: User,
                 attributes: ['name']
 
             },
             {
                 model: Comment,
                 include: [
                     {
                         model: User,
                         attributes: ['name']
                     }
                 ]
             }
         ]
         
     })
     const post = posts.get({plain:true})
    res.render('comment', {
     post,
     comments: post.comments,
     logged_in: req.session.logged_in
    })
    }catch(err){
     res.status(400).json(err)
    }
 })

 router.get('/updatePost/:id', withAuth,async(req, res)=> {
    try{
        const updatePost = await Post.findOne({
            where: {id:req.params.id}
        })
        const post = updatePost.get({plain: true})
        res.render('update',{
            post,
            logged_in: req.session.logged_in
        })
    }catch(err){
        res.status(500).json(err)
    }
 })

 
module.exports = router