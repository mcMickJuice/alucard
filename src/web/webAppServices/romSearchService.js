var Rom = require('alucard-common/models/Rom');

function searchRoms(searchCriteria) {
    //build up query
    var titlePattern = new RegExp(searchCriteria.text.trim(), 'i');
    return Rom.find({
        title: titlePattern
    })
    .limit(20)
    .exec();
}

module.exports = {
    searchRoms
}