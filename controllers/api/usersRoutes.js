const router = require('express').Router()
const sequelize = require('../../config/connection')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: fileFilter
  })

const { Entry, User, Comment } = require('../../models')
// api/users route
router.get(`/`, async (req, res) => {
    try {
    const dbData = await User.findAll({
            attributes: { exclude: `password` }
        })
        res.json(dbData)

    } catch (err) {
        res.status(500).json(err)
    }
})

// api/users/:id
router.get(`/:id`, async (req, res) => {
    try {
        const dbByID = await User.findOne({
            attributes: {exclude: `password`},
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Entry,
                    attributes: [`id`, `entry_title`, `entry_content`, `created_at`]
                },
                {
                    model: Comment,
                    attributes: [`id`, `comment_content`, `created_at`],
                    include: {
                        model: Entry,
                        attributes: [`entry_title`]
                    }
                }
            ]
        })
        if(!dbByID){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbByID)
        
    } catch (err) { res.status(500).json(err)}
})
// api/users post route
router.post(`/`, async (req, res) => {
    try {
     const dbUser = await  User.create({
         name: req.body.name,
         user_name: req.body.user_name,
         email: req.body.email,
         password: req.body.password,
         bio: req.body.bio,
         location: req.body.location

     })
     req.session.save( () => {
 
         req.session.user_id = dbUser.id;
         req.session.name = dbUser.user_name;
         req.session.loggedIn = true;
 
         res.json(dbUser)
 
     })
     
    } catch (err) {
     res.status(500).json(err)
    }
})

// api/users/login
router.post(`/login`, async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!userLogin){
            res.status(404).json({message: `user not found`})
            return
        }
        const verifyPassword = userLogin.checkPassword(req.body.password)
        if(!verifyPassword){
            res.status(400).json({message: `Password is incorrect`})
            return
        }
       
        req.session.save( () => {
        req.session.user_id = userLogin.id;
        req.session.name = userLogin.user_name;
        req.session.loggedIn = true;

        res.json({user: userLogin, message: `you are now logged in`})
        })

     } catch (err) { res.status(500).json(err)}
    
})

//api/user/logout
router.post('/logout', (req, res) => {
    req.session.loggedIn?
        req.session.destroy(() => {res.status(204).end()}):   
        res.status(404).end()
    
})

//api/users/:id update route
router.put(`/:id`,async (req, res) => {
    try {
        const dbUpdate = await User.update({
         name: req.body.name,
         user_name: req.body.user_name,
         email: req.body.email,
         bio: req.body.bio,
         location: req.body.location,
        }, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        if(!dbUpdate){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.put(`/picture/:id`, upload.single(`profile_pic`), async (req, res)=>{
    try {
        const profilePic = await User.update({
         profile_pic: req.file.path
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.json(profilePic)
    } catch (error) {
        res.status(500).json(error)
    }
})

//api/users/:id delete route
router.delete(`/:id`, async (req, res) => {
    try {
        const dbDelete = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbDelete){
            res.status(404).json({message: `user not found`})
        }
        res.json(dbDelete)
        
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router