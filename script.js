// Variables globales
let nextRequest = "";
let prevRequest = "";

// Referencia botones
const nextBTN = document.querySelector("#next-btn");
const prevBTN = document.querySelector("#prev-btn");

// Definicion de eventos click
prevBTN.onclick = function () {
  loadPlanets(prevRequest)
}

nextBTN.onclick = function () {
  loadPlanets(nextRequest);
};

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

// funcion para que hace get y llama a refresh
function loadPlanets(url) {
  axios.get(url).then(function (response) {
    nextRequest = response.data.next;
    prevRequest = response.data.previous;
    const allPlanets = response.data.results;
    refreshPlanets(allPlanets);
  });
}

// First load de los planetas
loadPlanets("https://www.swapi.tech/api/planets");
