var quotes = [
'Arctic',
'Tundra',
'Alaska',
'Arctic ocean',
'Arctic circle',
'Antarctic',
'Reindeer',
'North pole',
'Glacier',
'Polar bear',
'Penguin',
'Arctic fox',
'Arctic hare',
'Beluga whale',
'Seal',
'Puffin',
'Caribou',
'Walrus',
'Norway'
]

function newQuote() {
	var randomNumber = Math.floor(Math.random() * (quotes.length));
	document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
	
}