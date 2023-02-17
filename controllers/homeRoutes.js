const router = require('express').Router()
const { Entry, User, Comment } = require('../models')
const withAuth = require(`../utils/auth`)
router.get('/landing', (req, res) => res.render(`home`))
  
router.get(`/`, withAuth, async (req, res) => {
    try {        
        const entryData = await Entry.findAll({
            attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
            include: [{
                model: Comment,
                attributes: [`id`, `comment_content`, `entry_id`, `user_id`, `created_at`],
                include: {
                    model: User,
                    attributes: [`user_name`]
                }
            },
            {
                model: User,
                attributes: [`id`, `user_name`]
            }]
        })
        const entries = entryData.map((entry) => entry.get({ plain:true }))
        console.log(entries)
        res.render(`allUserPosts`, { entries, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
    } catch (err) {res.status(500).json(err)}
})
router.get(`/signup`, (req, res)=> [
    req.session.loggedIn?
    res.redirect(`/`):
    res.render(`signup`)
])

router.get(`/login`, (req, res) => {
    req.session.loggedIn?
        res.redirect(`/`):
        res.render(`login`)
})

router.get(`/entries/:id`, withAuth, async (req, res) => {
   try {
    const byIdData = await Entry.findOne({
        where: {
            id: req.params.id
        },
        attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
        include: [{
            model: Comment,
            attributes: [`id`, `comment_content`, `entry_id`, `user_id`, `created_at`],
            include: {
                model: User,
                attributes: [`user_name`]
            }
        },
        {
            model: User,
            attributes: [`id`, `user_name`]
        }]
    })
    if(!byIdData){
        res.status(404).json({message: `no entries found`})
    }
    const entry = byIdData.get({plain:true})
    res.render(`singleEntry`, {entry, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
   } catch (err) {
    res.status(500).json(err)
   }

})




module.exports =  router