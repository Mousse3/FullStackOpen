import ApiConnection from './ApiConnection'

const removeNumber = (id, name, {setErrorMessage}) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
        ApiConnection.remove(id)
        setErrorMessage(`${name} removed`)
        setTimeout(function() {
            window.location.reload()
        }.bind(this), 4000)
    }
}

export default { removeNumber }