const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0

    blogs.forEach(blog => {
        likes += blog['likes']
    })

    return likes
}

const favouriteBlog = (blogs) => {
    let favBlog
    let maxLikes = 0

    blogs.forEach(blog => {
        if (blog['likes'] > maxLikes) {
            favBlog = blog
            maxLikes = blog['likes']
        }
    })

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}