const sorterBy = (sortBy) => {
    return sortBy || "user_id"
}

const sorterDirection = (sortDirection) => {
    return sortDirection || "ASC"
}

module.exports = {
    sorterBy,
    sorterDirection
}
