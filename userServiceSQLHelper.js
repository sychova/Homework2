function sortBy(sortBy) {
    return sortBy || "UserID"
};

function sortDirection(sortDirection) {
    return sortDirection || "ASC"
};

module.exports.sortBy = sortBy;
module.exports.sortDirection = sortDirection;