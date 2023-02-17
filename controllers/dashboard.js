const router = require('express').Router()
const { Entry, User, Comment } = require('../models')
const withAuth = require(`../utils/auth`)
//  /dashboard routed
router.get(`/`, withAuth, async (req, res) => {
    try {
        const userData = await Entry.findAll({
            where: {
                user_id: req.session.user_id
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
        const entries = userData.map((entry)=> entry.get({plain:true}))
        console.log(entries)
        res.render(`dashboard`, {entries, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
    } catch (err) {
        res.status(500).json(err)       
    }
})
// /dashboard/post/:id
router.get(`/post/:id`, withAuth, async (req, res) => {
    try {
     const byIdData = Entry.findOne({
         where: {
             id: req.session.id
         },
         attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
         include: [{
             model: Comment,
             attributes: [`id`, `comment_content`, `entry_id`, `user_id`],
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
     res.render(`singlePost`, {entry, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
    } catch (err) {
     res.status(500).json(err)
    }
})
//  /dashboard/profile
router.get(`/profile/:id`, withAuth, async (req, res) => {
    try {
        const userProfile = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: [`user_name`, `name`, `email`, `bio`, `location`]
        })
        if(!userProfile){
            res.status(404).json({message: `user not found`})
        }
        const user = userProfile.get({plain:true})
        res.render(`profile`, {user, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get(`/profile/edit/:id`, withAuth, async (req, res) => {
    try {
        const userProfile = await User.findOne({
            attributes: [`user_name`, `name`, `email`, `bio`, `location`],
            where: {
                id: req.params.id
            }
        })
        if(!userProfile){
            res.status(404).json({message: `user not found`})
        }
        const user = userProfile.get({plain:true})
        res.render(`editProfile`, {user, loggedIn: req.session.loggedIn, user_id: req.session.user_id})
    } catch (error) {
        res.status(500).json(error)
    }
})



//  /dashboard/create
router.get(`/create`, withAuth, (req, res) => res.render(`new-entry`))
module.exports =  router