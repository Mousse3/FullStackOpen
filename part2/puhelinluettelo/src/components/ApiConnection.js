import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${url}/${id}`)
    console.log('deleted')
    return request.then(response => response.data)
}

const modify = (id, newObject) => {
    axios.put(`${url}/${id}`, newObject)
    console.log('modified')
}

export default { getNumbers, create, remove, modify }