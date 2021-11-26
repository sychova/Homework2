function sorterBy(sortBy) {
    return sortBy || "user_id"
};

function sorterDirection(sortDirection) {
    return sortDirection || "ASC"
};

module.exports = {
    sorterBy,
    sorterDirection
}