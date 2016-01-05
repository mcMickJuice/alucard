var webClient = require('./webClient');

function getHtml(url) {
    return webClient.getRequestBody(url)
        .then(html => {
            console.log('html');
        })
}

module.exports = {
    getHtml
}