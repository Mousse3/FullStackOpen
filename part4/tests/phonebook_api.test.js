const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

describe('Viewing blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(2)
    })
    
    test ('the first field is called id', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Testy Tester',
            url: 'www.google.com',
            likes: 9
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const title = response.body.map(r => r.title)
    
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(title).toContain('Test blog')
    })
    
    test('default value for likes is 0', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Testy Tester',
            url: 'www.google.com'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const likes = response.body[2].likes
    
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(likes).toBe(0)
    })
    
    test('request without url/title returns 400 bad request', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Testy Tester',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const newBlog2 = {
            url: 'www.google.com',
            author: 'Testy Tester',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('deleting a blog', () => {
    test('a blog can be deleted', async () => {
        const newBlog = {
            title: 'Kuinka poistetaan blogi',
            author:'Olli Kirjoittaja',
            url: 'www.wordpress.com',
            likes: 7
        }
    
        const addedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
    
        const id = addedBlog.body.id
    
        await api
            .delete(`/api/blogs/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('a blog cannot be deleted twice / cannot delete a nonexistent blog', async() => {
        const newBlog = {
            title: 'Kuinka poistetaan blogi',
            author:'Olli Kirjoittaja',
            url: 'www.wordpress.com',
            likes: 7
        }
    
        const addedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
    
        const id = addedBlog.body.id
    
        await api
            .delete(`/api/blogs/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        await api
            .delete(`/api/blogs/${id}`)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('request with malformatted id returns 400 bad request', async() => {
        await api
            .delete('/api/blogs/dfhoro345346kfdh46')
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})