const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Comment } = require('../../models')
// api/comments --- get comments from db
router.get(`/`, async (req, res) => {
    try {
        const dbComments = await Comment.findAll()
        res.json(dbComments)
    } catch (err) {
        res.status(500).json(err)
    }
})

// api/comments/:id --- get comments from db by id
router.get(`/:id`, async (req, res) => {
    try {
        const dbCommentByID = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!dbCommentByID) {
            res.status(404).json({message: `comment not found`})
        }
        res.json(dbCommentByID)
    } catch (err) {
        res.status(500).json(err)
    }
})
// api/comments post route --- add comments to db
router.post(`/`, async (req, res) => {
    try {
        const dbCreateComment = await Comment.create({
                comment_content: req.body.comment_content,
                entry_id: req.body.entry_id,
                user_id: req.session.user_id
        })
        res.json(dbCreateComment)
    } catch (err) {
        res.status(500).json(err)
    }
})
// api/comments edit
router.put(`/:id`, async (req, res) => {
    try {       
        const dbCommentUpdate = await Comment.update({
            comment_content: req.body.comment_content
        },
        {
            where: {
                id: req.params.id
            }
        })
        if(!dbCommentUpdate){
            res.status(404).json({message: `no comment found`})
        }
        res.json(dbCommentUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

//api/comments delete
router.delete(`/:id`, async (req, res) => {
    try {
        const dbCommentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbCommentDelete){
            res.status(404).json({message: `no comment found`})
        }
        res.json(dbCommentDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports =  router