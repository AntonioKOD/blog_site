const sequelize = require('../config/connection')
const {User, Post, Comment} = require('../models')

const userData = require('./userSeeds.json')
const postData = require('./postSeeds.json')
const commentData = require('./commentSeeds.json')


const seedData = async () => {
    await sequelize.sync({force: true})


    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })

    for (const post of postData){
        const user = users.find((user)=> user.id === post.author_id)
        if(user){
        await Post.create({
            ...post,
            author_id: user.id,

        })
    }
    }
    const posts = await Post.findAll()

    for (const comment of commentData){
        const user = users.find((user)=> user.id === comment.author_id)
        const post = posts.find((post)=> post.id === comment.post_id)

        if(user && post){
        await Comment.create({
            ...comment,
            author_id: users.id,
            post_id: Post.id,
        })
    }
    }
    process.exit(0);
}

seedData()
