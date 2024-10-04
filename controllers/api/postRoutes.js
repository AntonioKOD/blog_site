const router = require('express').Router()
const { where } = require('sequelize');
const {Post, Comment} = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/comment', withAuth, async(req,res)=> {
    try{
        
        const {content, post_id} = req.body;
        const newComment = await Comment.create({
            content: content,
            post_id: post_id,
            author_id: req.session.user_id,
            created_at: new Date()
        })

        res.render('comment',{
            newComment, 
            logged_in: req.session.logged_in
            
    })
    }catch(err){
        res.status(500).json(err)
    }
})


router.post('/add',async(req,res)=> {
    try{
        const {title, text_post} = req.body
            const newPost = await Post.create({
                title: title,
                text_post: text_post,
                created_at: new Date(),
                author_id: req.session.user_id
            })
            const post = newPost.get({plain: true})

            res.render('newpost', 
                {
                    post,
                    logged_in: req.session.logged_in
                }
            )
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',withAuth, async(req,res)=>{
    try{
        const {title, text_post} = req.body;
        const updatePost = await Post.update(
            {
                title: title,
                text_post: text_post,
                updated_at: new Date()
            },
            {
            where: {
                id: req.params.id
            }
        }
        )
        const posts = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const post = posts.get({plain:true})

        res.render('update', {
            post,
            logged_in: req.session.logged_in
        })

    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async(req,res)=> {
     const deletedPost = await Post.destroy({where: {id: req.params.id}})


     res.render('dashboard',{
        logged_in: req.session.logged_in
     }
     )
})

module.exports = router

