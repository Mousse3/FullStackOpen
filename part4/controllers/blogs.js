const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.find({ _id: request.params.id })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    let savedBlog = undefined
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    try {
        savedBlog = await blog.save()
    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
    }
    response.status(201)
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    let deletedBlog = undefined
    try {
        deletedBlog = await Blog.findOneAndDelete({ _id: request.params.id})
    } catch (error) {
        if (error.name === 'CastError') {
            return response.status(400).json({ error: 'Bad request id' })
        }
    }
    response.status(200)
    if (deletedBlog) {
        response.json(deletedBlog.toJSON())
    } else {
        return response.status(404).json({ error: 'Not found' })
    }
})

module.exports = blogsRouter