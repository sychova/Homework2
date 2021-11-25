function sortBy(sortBy) {
    return sortBy || "UserID"
};

function sortDirection(sortDirection) {
    if (sortDirection === "DESC") {
        return "DESC";
    } else {
        return "ASC";
    }
};

module.exports.sortBy = sortBy;
module.exports.sortDirection = sortDirection;