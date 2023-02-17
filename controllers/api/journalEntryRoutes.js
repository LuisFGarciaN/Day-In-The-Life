const router = require('express').Router()
const sequelize = require('../../config/connection')

const { Entry, User, Comment } = require('../../models')

router.get(`/`, async (req, res) => {
    try {
        const dbEntry = await Entry.findAll({
            attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
            order: [['created_at', 'DESC']],
            include:[ {
                model:User,
                attributes: [`user_name`]
            },
            {
                model: Comment,
                attributes: [`id`, `user_id`, `entry_id`, `comment_content`, `created_at`],
                include: {
                    model: User,
                    attributes: [`user_name`]
                }
            }]
        })
        res.json(dbEntry)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get(`/`, async (req, res) => {
    try {
        const dbEntry = await Entry.findAll({
            where: {
                id: req.params.id
            },
            attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
            order: [['created_at', 'DESC']],
            include:[ {
                model:User,
                attributes: [`user_name`]
            },
            {
                model: Comment,
                attributes: [`id`, `user_id`, `entry_id`, `comment_content`, `created_at`],
                include: {
                    model: User,
                    attributes: [`user_name`]
                }
            }]
        })
        if(!dbEntry){
            res.status(404).json({message: `Entry not found`})
        }
        res.json(dbEntry)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post(`/`, async (req, res) => {
    try {
        const dbCreateEntry = await Entry.create({
            entry_title: req.body.entry_title,
            entry_content: req.body.entry_content,
            user_id: req.session.user_id
        })
        res.json(dbCreateEntry)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put(`/:id`, async (req, res) => {
    try {
        const dbUpdate = await Entry.update({
            entry_title: req.body.entry_title,
            entry_content: req.body.entry_content
        },
        {
            where: {
                id: req.params.id
            }
            
        })
        if(!dbUpdate){
            res.status(404).json({message: `Entry not found`})
        }
        res.json(dbUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete(`/:id`, async (req, res) => {
    try {
        const dbPostDelete = await Entry.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbPostDelete) {
            res.status(404).json({message: `Entry not found`})
        }
        res.json(dbPostDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports =  router