



// récupérer les données de l'API et les afficher dans la page produits.html
fetch("https://pokeapi.co/api/v2/pokemon?limit=750")
    .then((response) => response.json())

    .then((data) => {
        data.results.forEach((pokemon) => {
        const card = document.querySelector("#card");
        // créer une div avec une classe pokemon et y mettre une image et un nom
        // si le tableau est vide, on ne fait rien
        if (localStorage.getItem("pokemon") === null) {
            return;
        }
        if (localStorage.getItem("pokemon") === null) {
            return;
        }
        // sinon on récupère le tableau et on le parse
        const tableau = JSON.parse(localStorage.getItem("pokemon"));
        // on récupère le nom et le prix du pokemon choisi
        const pokemonName = tableau[0];
        const pokemonPrice = tableau[1];
        const pokemonImage = tableau[2];
        // on récupère la balise image et h2 dans la div #card et on leur donne le nom et le prix du pokemon choisi
        const image = card.querySelector("img");
        const h2 = card.querySelector("h2");
        image.setAttribute("src", `${pokemonImage}`);
        h2.textContent = pokemonName;
        // on récupère le span et on lui donne le prix du pokemon choisi
        const span = card.querySelector("p");
        span.textContent = pokemonPrice;

        // en récupérant le nom du pokemon choisi, rechercher dans l'api les stats du pokemon choisi
});
});

const stats = JSON.parse(localStorage.getItem("stats"));
console.log(stats);
// Noms des statistiques dans l'ordre : HP, Attack, Defense, Special-Attack, Special-Defense, Speed
const statNames = ["HP", "Attack", "Defense", "Special-Attack", "Special-Defense", "Speed"];

// Afficher les stats dans la div stats de la page produits.html
const statsDiv = document.querySelector("#stats");

stats.forEach((stat, index) => {
    const statElement = document.createElement("li");
    // Ajouter le nom de la stat avec sa valeur
    statElement.textContent = `${statNames[index]}: ${stat}`;
    statsDiv.appendChild(statElement);
});

    

        // lorsqu'on click sur le bouton btn-panier, on ajoute le pokemon choisi dans le panier
        const btnPanier = document.querySelector("#btn-panier");

        btnPanier.addEventListener("click", () => {
            // Récupère le tableau de tous les pokémons sélectionnés jusqu'à présent
            let panier = JSON.parse(localStorage.getItem("panier")) || [];
        
            // Récupère le dernier pokémon sélectionné
            const nouveauPokemon = JSON.parse(localStorage.getItem("pokemon"));
            if (nouveauPokemon === null) {
                console.log("Aucun nouveau Pokémon à ajouter");
                return;
            }
        
            // Crée un objet pour le nouveau pokémon
            const pokemonData = {
                name: nouveauPokemon[0],
                price: nouveauPokemon[1],
                image: nouveauPokemon[2]
            };
        
            // Ajoute le nouveau Pokémon au panier existant
            panier.push(pokemonData);
        
            // Sauvegarde le panier mis à jour dans le local storage
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log("Après mise à jour, panier contient : ", panier);
        
            // Redirection vers la page panier.html après un court délai
            setTimeout(() => {
                window.location.href = "panier.html";
            }, 500);
        });
        
        
        

        function panier() {
            const nbPanier = document.querySelector("#nb-panier");
            if (localStorage.getItem('panier') === null) {
              return;
            }
            const panier = JSON.parse(localStorage.getItem('panier'));
            const nbPokemon = panier.length/1;
            nbPanier.textContent = nbPokemon;
            console.log(panier);
          }
          panier(); 
          



