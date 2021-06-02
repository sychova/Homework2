function sortBy(sortBy) {
    if (sortBy == "FirstName") {
        return "FirstName";
    } else if (sortBy == "LastName") {
        return "LastName";
    } else if (sortBy == "Age") {
        return "Age";
    } else if (sortBy == "Phone") {
        return "Phone";
    } else if (sortBy == "Email") {
        return "Email";
    } else if (sortBy == "Gender") {
        return "Gender";
    } else {
        return "UserID";
    }
};

function sortDirection(sortDirection) {
    if (sortDirection == "DESC") {
        return "DESC";
    } else {
        return "ASC";
    }
};

module.exports.sortBy = sortBy;
module.exports.sortDirection = sortDirection;