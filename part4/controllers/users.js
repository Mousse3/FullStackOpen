const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (body.password.length < 3 || body.username.length < 3) {
        return response.status(400).json({ error: 'Username or password shorter than 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    let savedUser = undefined
    try {
        savedUser = await user.save()
    } catch (error) {
        return next(error)
    }

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const blogs = await User.find({})
    response.json(blogs.map(user => user.toJSON()))
})

module.exports = usersRouter