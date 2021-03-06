const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1})
    
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    let blog = undefined
    try {
        blog = await Blog.findById(request.params.id)
    } catch (error) {
        return next(error)
    }
    if (blog) {
        return response.json(blog.toJSON())
    } else {
        return response.status(404).json({ error: 'Not found'})
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    let savedBlog = undefined
    let decodedToken = undefined
    const body = request.body

    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }
    try {
        decodedToken = request.user
    } catch (error) {
        return next(error)
    }
    
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    try {
        savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    } catch (error) {
        return next(error)
    }
    response.status(201)
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    let deletedBlog = undefined

    try {
        deletedBlog = await Blog.findOne({ _id: request.params.id})
        const user = request.user

        if (deletedBlog.user.toString() === user.id.toString()) {
            deletedBlog.delete()
        } else {
            return response.status(401).json({ error: 'Deletion unauthorized'})
        }
    } catch (error) {
        return next(error)
    }

    response.status(200)
    if (deletedBlog) {
        response.json(deletedBlog.toJSON())
    } else {
        return response.status(404).json({ error: 'Not found' })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    let updatedBlog = undefined
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    } catch (error) {
        return next(error)
    }
    if (updatedBlog) {
        return response.json(updatedBlog.toJSON())
    } else {
        return response.status(404).json({ error: 'Not found' })
    }
})

module.exports = blogsRouter