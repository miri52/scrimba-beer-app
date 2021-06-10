// variables
const urlBase = "https://api.punkapi.com/v2/beers?page=";
const beersDiv = document.querySelector(".beers");
const filterABV = document.getElementById("filterABV");
const filterIBU = document.getElementById("filterIBU");
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");

let optionsABV = "";
let optionsIBU = "";
let page = 1;

// filters
filterABV.addEventListener("change", (e) => {
  const value = e.target.value;
  switch (value) {
    case "all":
      optionsABV = "";
      break;
    case "weak":
      optionsABV = "&abv_lt=4.6";
      break;
    case "medium":
      optionsABV = "&abv_gt=4.5&abv_lt=7.6";
      break;
    case "strong":
      optionsABV = "&abv_gt=7.5";
      break;
  }

  page = 1;

  getBeers();
});

filterIBU.addEventListener("change", (e) => {
  const value = e.target.value;
  switch (value) {
    case "all":
      optionsIBU = "";
      break;
    case "weak":
      optionsIBU = "&ibu_lt=35";
      break;
    case "medium":
      optionsIBU = "&ibu_gt=34&ibu_lt=75";
      break;
    case "strong":
      optionsIBU = "&ibu_gt=74";
      break;
  }

  page = 1;

  getBeers();
});

//punk API limits every request to 25 beers
async function getBeers() {
  const url = urlBase + page + optionsABV + optionsIBU;
  console.log(url);
  try {
    // fetch data
    const request = await fetch(url);
    const beerData = await request.json();

    // pagination

    // disable prev button
    pageText.innerText = page;
    if (page === 1) {
      prevPage.disabled = true;
    } else {
      prevPage.disabled = false;
    }

    // disable next button
    if (beerData.length < 25) {
      nextPage.disabled = true;
    } else {
      nextPage.disabled = false;
    }

    // render data
    let beerHtml = "";
    const genericBottle =
      "https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png";

    for (let i = 0; i < beerData.length; i++) {
      const beer = beerData[i];

      beerHtml += `
      <div class='beer-wrapper card'>
            <div class='beer'>
                <img class='beer__img' src="${
                  beer.image_url ? beer.image_url : genericBottle
                }">
                <h3>${beer.name}</h3>
                <span class='beer__info'>
                    <span>ABV:${beer.abv}%</span>
                    <span>IBU: ${beer.ibu} </span>
                </span>
            </div>
            <div class='beer__content'>
                <div class='beer__name'>${beer.name}</div>
                <div class='beer__tagline'>${beer.tagline}</div>
                <div class='beer__description'>${beer.description}</div>
                <div class='beer__food-pairing'>
                    Pair with: ${beer.food_pairing.join(", ")}
                </div>
            </div>
        </div>`;
    }

    beersDiv.innerHTML = beerHtml;
  } catch (err) {
    console.error(err);
  }
}

// pagination
prevPage.addEventListener("click", () => {
  page--;
  getBeers();
});
nextPage.addEventListener("click", () => {
  page++;
  getBeers();
});

// inital get
getBeers();
