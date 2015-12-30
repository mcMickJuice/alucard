var cheerio = require('cheerio');

function parseHtmlAndMap(htmlText, selector, mapper) {
	var $ = cheerio.load(htmlText);
	var items = $(selector);

	var mappedItems= [];
	//cheerio map returns index as keys...
	items.each((idx, item) => {
		var $item = $(item);
		var mapped = mapper($item);
		mappedItems.push(mapped)
	})

	return mappedItems;
}

module.exports = {
	parseHtmlAndMap	
}