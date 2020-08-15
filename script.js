const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const loader = document.querySelector("#loader");

function showLoadingSpinner(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// get quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = "https://blooming-scrubland-17744.herokuapp.com/"
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            quoteText.innerText = "Unknown"
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    }catch (error){
        getQuote();
        console.log("you get an error when trying to fetch quote" , error);
    }
}
//tweeter quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl , '_blank');//open new tab
}

//Event listener
document.querySelector("#newQuoteBtn").addEventListener("click",getQuote);
document.querySelector("#twitterBtn").addEventListener("click",tweetQuote);


//Loader
getQuote();
