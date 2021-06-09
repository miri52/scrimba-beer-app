// variables
const urlBase = "https://api.punkapi.com/v2/beers";
const beersDiv = document.querySelector(".beers");

// Create an async function called "getBeers" that uses fetch to get our beer data from the urlBase.
// Render each beer name inside the div with the class of beers that currently exists in the HTML file.

//punk API limits every request to 25 beers
async function getBeers() {
  try {
    const request = await fetch(urlBase);
    const beerData = await request.json();

    let beerHtml = "";

    for (let i = 0; i < beerData.length; i++) {
      let beerName = beerData[i].name;
      beerHtml += `
      <h3>${beerName}</h3>`;
    }

    beersDiv.innerHTML = beerHtml;
  } catch (err) {
    console.error(err);
  }
}

getBeers();
