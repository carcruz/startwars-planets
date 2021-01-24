// Variables globales
let nextRequest = "";
let prevRequest = "";

// Referencia botones
const nextBTN = document.querySelector("#next-btn");
const prevBTN = document.querySelector("#prev-btn");

// Definicion de eventos click
// prevBTN.onclick = function () {
//   loadPlanets(prevRequest)
// }

// nextBTN.onclick = function () {
//   loadPlanets(nextRequest);
// };

// funcion para imprimir elementos
function refreshPlanets(planets) {
  // Get nodo de HTML
  const listParent = document.querySelector("#lista-planetas");
  // Respuesta inicialmente vacia
  let responseHTML = "";
  for (let i = 0; i < planets.length; i++) {
    // NOTA: revisar que eson los template strings
    responseHTML =
      responseHTML + `<li class="list-group-item">${planets[i].name}</li>`;
  }
  // innerHTML es la referencia al contenido de un nodo, se puede sobreescribir
  listParent.innerHTML = responseHTML;
}

//Funcion para imprimir elementos de peliculas
function refreshFilms (films){
  //Get nodo de HTML
  const listFilms = document.querySelector("#accordionExample");
  // Respuesta inicalmente vacia
  let responseHTML = "";
  films.forEach(function (film){
    console.log(film);
    const filmString = `<div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Film-${film.uid}" aria-expanded="true" aria-controls="collapseOne">
        ${film.properties.title}
      </button>
    </h2>
    <div id="Film-${film.uid}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p> ${film.properties.opening_crawl}</p>
      </div>
    </div>
  </div>`
  responseHTML = responseHTML + filmString;
  console.log("Acumulador", responseHTML);
  }); 
listFilms.innerHTML = responseHTML;
}

// funcion para que hace get y llama a refresh
function loadPlanets(url) {
  axios.get(url).then(function (response) {
    nextRequest = response.data.next;
    prevRequest = response.data.previous;
    const allPlanets = response.data.results;
    refreshPlanets(allPlanets);
  });
}

/**
 * Load films
 * @param url {string}
 */
function loadFilms(url) {
  axios.get(url).then(function (response){
    console.log("Respuesta Axios", response);
    const allFilms = response.data.result;
    console.log("All Films", allFilms);
    refreshFilms(allFilms); 


  })
}


// First load de los planetas
// loadPlanets("https://www.swapi.tech/api/planets");

// axios.get("https://www.swapi.tech/api/planets");
loadFilms("https://www.swapi.tech/api/films");
