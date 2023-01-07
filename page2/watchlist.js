
const leadsLocalStorage = JSON.parse(localStorage.getItem("movies"));



function showMovie(datas) {
    check()
    datas.map( data =>{
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
    star.setAttribute("src", "../public/Icon-4.png");
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
    add.innerText = "Remove";
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

})

  }

  
showMovie(leadsLocalStorage)


document.body.addEventListener('click', (e) =>{  
    if(e.target.dataset.id){
        console.log(e.target.dataset.id);
    let rewriteStorage = leadsLocalStorage.filter( id => id.imdbID !== e.target.dataset.id )
    window.localStorage.setItem("movies", JSON.stringify(rewriteStorage));
    }
    window.location.reload()
})


function check() {
    if(leadsLocalStorage.length){
        document.getElementById('search-result').classList.remove('pre');
        document.getElementById('no-movie').classList.add('hidden');
        }else{
            document.getElementById('search-result').classList.add('pre');
        document.getElementById('no-movie').classList.remove('hidden');
        }
    
}