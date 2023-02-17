const router = require('express').Router()
const commentRoutes = require(`./commentRoutes`)
const journalEntryRoutes = require(`./journalEntryRoutes`)
const userRoutes = require(`./usersRoutes`)

router.use(`/comments`, commentRoutes)
router.use(`/entries`, journalEntryRoutes)
router.use(`/users`, userRoutes)

module.exports =  router