function sorterBy(sortBy) {
    return sortBy || "UserID"
};

function sorterDirection(sortDirection) {
    return sortDirection || "ASC"
};

module.exports = {
    sorterBy,
    sorterDirection
}