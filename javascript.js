var wiki = [
'arctic',
'tundra',
'alaska',
'Antartica',
'reindeer',
'north%20pole',
'glacier',
'polar%20bear',
'penguin',
'fur%20seal',
'walrus',
'norway',
'polar%20bear',
'arctic%20fox'
]

function newQuote() {
	var randomNumber = Math.floor(Math.random() * (wiki.length));
	return wiki[randomNumber];
	
}

var quotes = [
'arctic',
'tundra',
'alaska',
'Antartica',
'reindeer',
'north pole',
'glacier',
'polar bear',
'penguin',
'fur seal',
'walrus',
'norway',
'polar bear',
'arctic fox'
]





function moreQuote() {
	var randomNumber = Math.floor(Math.random() * (quotes.length));
	document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
	return quotes[randomNumber];
	
}