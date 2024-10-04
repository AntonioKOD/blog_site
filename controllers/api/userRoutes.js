const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')


router.post('/signup', async (req,res) => {
    try{
        const newUser = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            
            res.status(200).json(newUser);
        })
    }catch(err){
        res.status(400).json(err)
    }
})

router.post('/login', async (req,res) => {
    try{
        const userLogin = await User.findOne({where: {
            email: req.body.email
        }})

        if(!userLogin){
            res.status(400).json({message: 'Incorrect email or password'})
            return
        }
        const validPass = userLogin.checkPassword(req.body.password);

        if(!validPass){
            res.status(404).json({message: "Incorrect email or password"})
        }
        req.session.save(()=> {
            req.session.user_id = userLogin.id
            req.session.logged_in = true

            res.status(200).json({message: "You are now logged in"})
        })
    }catch(err){
        res.status(500).json(err)
    }
})


router.post('/logout', (req,res)=> {
        if(req.session.logged_in){
            req.session.destroy(()=> {
                res.status(204).end()
            })
        }else{
        res.render('login')  
        }
})





module.exports = router