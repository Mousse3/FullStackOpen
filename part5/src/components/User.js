import React from 'react'

const logOut = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  window.location.reload()
}

const User = ({ user }) => (
  <div>
    <p>
      {user.name}
      <b> logged in </b>
      <button onClick={logOut}>logout</button>
    </p>
  </div>
)

export default User