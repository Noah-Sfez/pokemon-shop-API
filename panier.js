
function panier() {
    const nbPanier = document.querySelector("#nb-panier");
    if (localStorage.getItem('panier') === null) {
      return; 
    }
    const panier = JSON.parse(localStorage.getItem('panier'));
    const nbPokemon = panier.length / 1;
    nbPanier.textContent = nbPokemon;
    console.log(panier);
  }
  panier(); 

let panierTotal = [];

function loadPanierFromLocalStorage() {
    const storedPanier = localStorage.getItem('panier');
    if (storedPanier === null) {
        return []; 
    }
    return JSON.parse(storedPanier); 
}

function showPanier() {
    const panierDiv = document.querySelector("#liste-panier");
    const titlePanier = document.querySelector(".title-panier");
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (!panier || panier.length === 0) {
        titlePanier.textContent = "Votre panier est vide"; 
        panierDiv.style.display = "none"; 
        return;
    }
    panier.forEach((pokemon) => {
        const pokemonElement = document.createElement("li");
        pokemonElement.textContent = `${pokemon.name} - ${pokemon.price}`;
        const imageElement = document.createElement("img");
        imageElement.src = pokemon.image;
        pokemonElement.appendChild(imageElement);
        panierDiv.appendChild(pokemonElement);
        const button = document.createElement("button");
        button.textContent = "🗑️";
        pokemonElement.appendChild(button);
        button.addEventListener("click", () => {
            const index = panier.indexOf(pokemon);
            panier.splice(index, 1);
            localStorage.setItem("panier", JSON.stringify(panier));
            setTimeout(() => {
                window.location.href = "panier.html";
            }, 500);
        });

    });
    const prixTotal = document.querySelector("#total");
    let total = 0;
    panier.forEach((pokemon) => {
        total += parseInt(pokemon.price);
    });
    prixTotal.textContent = total + " $";
}

showPanier();


