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
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
        // changer le contenu du texte .title-panier
        const titlePanier = document.querySelector(".title-panier");
        titlePanier.textContent = "Votre panier est vide";
        return;
    }
    panier.forEach((pokemon) => {
        const pokemonElement = document.createElement("li");
        pokemonElement.textContent = `${pokemon.name} - ${pokemon.price}`;
        const imageElement = document.createElement("img");
        imageElement.src = pokemon.image;
        pokemonElement.appendChild(imageElement);
        panierDiv.appendChild(pokemonElement);
        // ajouter un bouton pour supprimer individuellement chaque pokemon du panier
        const button = document.createElement("button");
        button.textContent = "🗑️";
        pokemonElement.appendChild(button);
        button.addEventListener("click", () => {
            // supprimer le pokemon du panier
            const index = panier.indexOf(pokemon);
            panier.splice(index, 1);
            localStorage.setItem("panier", JSON.stringify(panier));
            // recharger la page panier.html
            setTimeout(() => {
                window.location.href = "panier.html";
            }, 500);
        });

    });
    console.log(panier);

    // afficher le prix total du panier
    const prixTotal = document.querySelector("#total");
    let total = 0;
    panier.forEach((pokemon) => {
        total += parseInt(pokemon.price);
    });
    prixTotal.textContent = total + " $";
}

showPanier();

// si le panier est vide, changer le contenu du texte .title-panier 

