let pageNumber = 1;
let watchLists = [];

let leadsLocalStorage = JSON.parse(localStorage.getItem("movies"));
if (leadsLocalStorage) {
  watchLists = leadsLocalStorage;
}
document.querySelector("input").value = ''
document.querySelector("button").addEventListener("click", () => {
  const input = document.querySelector("input").value;

  if (document.querySelector("input").value) {
    movieData(input, 1);
  }
});

  document.querySelector("#previous").addEventListener("click", () => {
    if (document.querySelector("input").value) {
    const input = document.querySelector("input").value;
    if (pageNumber != 1) {
      pageNumber--;
    }
    movieData(input, pageNumber);
  }
  });

  document.querySelector("#next").addEventListener("click", () => {
    if (document.querySelector("input").value) {
    const input = document.querySelector("input").value;
    pageNumber++;
    movieData(input, pageNumber);
    }
  });

async function movieData(value, page) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${value}&page=${page}&apikey=56c8e3fa`
  );
  const data = await response.json();

  data.Response == "True"
    ? singleMovieData(data.Search)
    : (document.getElementById("search-result").innerHTML =
        '<p class="pre">Unable to find what you’re looking for. Please try another search.</p>');
}

function singleMovieData(data) {
  document.querySelector("#search-result").innerText = "";
  document.getElementById("search-result").classList.remove("pre");
  data.map((id) => {
    findMovieData(id.imdbID);
  });
}

async function findMovieData(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&page=3&apikey=56c8e3fa`
  );
  const data = await response.json();

  showMovie(data);
}

function showMovie(data) {
  console.log(data);
  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("class", "movie-container");
  const poster = document.createElement("img");
  poster.setAttribute("src", data.Poster);
  poster.setAttribute("class", "poster");
  const movieContainer = document.createElement("div");
  movieContainer.setAttribute("class", "movie");
  const titleARate = document.createElement("div");
  titleARate.setAttribute("class", "title-info");
  const star = document.createElement("img");
  star.setAttribute("src", "./public/Icon-4.png");
  const title = document.createElement("h1");
  title.innerText = data.Title;
  const rating = document.createElement("p");
  rating.innerText = data.imdbRating;
  const extraData = document.createElement("div");
  extraData.setAttribute("class", "extra-data");
  const duration = document.createElement("p");
  duration.innerText = data.Runtime;
  const genre = document.createElement("p");
  genre.innerText = data.Genre;
  const add = document.createElement("button");
  add.setAttribute('data-id', data.imdbID)
  add.innerText = "Watchlist";
  const description = document.createElement("p");
  description.setAttribute("class", "Description");
  description.innerText = data.Plot;
  document.querySelector("#search-result").appendChild(mainContainer);
  mainContainer.append(poster);
  mainContainer.appendChild(movieContainer);
  titleARate.appendChild(title);
  titleARate.appendChild(star);
  titleARate.appendChild(rating);
  extraData.appendChild(duration);
  extraData.appendChild(genre);
  extraData.appendChild(add);
  movieContainer.appendChild(titleARate);
  movieContainer.appendChild(extraData);
  movieContainer.appendChild(description);
}

document.body.addEventListener('click' , (e) =>{
  if(e.target.dataset.id){
   watchList(e.target.dataset.id)
  }
})

async function watchList(id) {
 console.log(id);
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=56c8e3fa`
  );
  const data = await response.json();
 watchLists.unshift(data)
  window.localStorage.setItem("movies", JSON.stringify(watchLists)); 
}
