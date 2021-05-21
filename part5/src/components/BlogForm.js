import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogForm = ({ setBlogs, blogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <p>Title:</p>
        <input type='text' onChange={handleTitleChange} value={newTitle}/>
        <p>Author:</p>
        <input type='text' onChange={handleAuthorChange} value={newAuthor}/>
        <p>Url:</p>
        <input type='text' onChange={handleUrlChange} value={newUrl}/>
        <br></br>
        <br></br>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default BlogForm