var quotes = [
'Arctic',
'tundra',
'polar',
'Alaska',
'arctic ocean',
'arctic circle',
'ice',
'Antarctic',
'reindeer',
'north pole',
'glacier',
'polar bear',
'penguin',
'arctic fox',
'arctic hare',
'arctic tern',
'arctic wolf',
'beluga whale',
'seal',
'killer whale',
'moose',
'narwhal',
'northern fur seal',
'puffin',
'owl',
'caribou',
'walrus ice',
'Norway',
'ice cap'
]

function newQuote() {
	var randomNumber = Math.floor(Math.random() * (quotes.length));
	document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
	
}