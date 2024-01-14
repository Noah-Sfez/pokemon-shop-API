
const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
    // ... autres types et couleurs
};


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
        const pokemonType = tableau[3];
        // on récupère la balise image et h2 dans la div #card et on leur donne le nom et le prix du pokemon choisi
        const image = card.querySelector("img");
        const h2 = card.querySelector("h2");
        image.setAttribute("src", `${pokemonImage}`);
        h2.textContent = pokemonName;
        // on récupère le span et on lui donne le prix du pokemon choisi
        const span = card.querySelector("p");
        span.textContent = pokemonPrice;

        // Changer la couleur de fond de la page ou de la div en fonction du type du Pokémon
        card.style.backgroundColor = colors[pokemonType] || 'white'; // Appliquer la couleur de fond à la div #card

        const listItems = card.querySelectorAll("li");
        listItems.forEach(li => {
            li.style.backgroundColor = colors[pokemonType] || 'white'; // Appliquer la couleur de fond à chaque élément li
        });
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
        const ajoutContinue = document.querySelector("#btn-ajoutContinue");

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

            const messageDiv = document.getElementById("message");
            messageDiv.innerText = `${nouveauPokemon[0]} a été ajouté au panier`;
            const messageContainer = document.getElementById("message-container");
            messageContainer.style.display = "block";
            messageDiv.classList.add("pop");

            // Ajoute la classe fadeOut après un délai de 2 secondes
            setTimeout(() => {
                messageDiv.classList.add("fadeOut");

                // Cache le conteneur après la fin de l'animation fadeOut
                setTimeout(() => {
                    messageContainer.style.display = "none";
                    messageDiv.classList.remove("pop", "fadeOut");

                    // Redirection vers la page panier.html après la fin des animations
                    window.location.href = "panier.html";
                }, 1000); // 1 seconde pour l'animation fadeOut
            }, 2000); // 2 secondes de délai après la fin de l'animation pop (1s)
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
          



