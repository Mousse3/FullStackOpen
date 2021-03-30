import ApiConnection from './ApiConnection'

const modifyNumber = noteItem => {
    const result = window.confirm(`${noteItem.name} is already added to phonebook, replace the old number with a new one?`)
    if (result) {
        ApiConnection.modify(noteItem.id, noteItem)
        setTimeout(function() {
            window.location.reload()
        }.bind(this), 4000)
    }
}

export default { modifyNumber }