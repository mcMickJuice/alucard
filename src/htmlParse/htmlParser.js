var cheerio = require('cheerio');

function parseHtmlAndMap(htmlText, selector, mapper) {
	var $ = cheerio.load(htmlText);
	var items = $(selector);

	var mappedItems= [];
	items.each((idx, item) => {
		var $item = $(item); //might not work...
		var mapped = mapper($item);
		mappedItems.push(mapped)
	})

	return mappedItems;
}

module.exports = {
	parseHtmlAndMap	
}