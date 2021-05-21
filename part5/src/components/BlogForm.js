import React from 'react'

const BlogForm = ({ addBlog, handleAuthorChange, handleTitleChange, handleUrlChange, newTitle, newAuthor, newUrl}) => {
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

export default BlogForm