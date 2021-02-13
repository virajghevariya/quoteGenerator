const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];
//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new Quote
function newQuote() {
    loading();
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // Check if author if blank then display 'unknown'
    if (!quote.author) {
        authorText.innerText = 'Unknown';
    }else {
        authorText.innerText = quote.author;
    }
    // Check if quote text is greater than 120 words than font-size is reduce because of long-quote class
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Show quote, hide loader
    quoteText.innerText = quote.text;
    complete();
    
}

//Get quote from API
async function getQuote(){
    loading();
    const apiUrl= "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();

    } catch (error) {
        console.log("whoops , no Quote" , error);
         
    }
}

// Tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Add event-listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//Load function
getQuote();