
// vider le tableau "tableau" du local storage
localStorage.removeItem("tableau");
// vider le tableau "stats" du local storage
localStorage.removeItem("stats");
// 1. récupérer les données de l'api

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

fetch("https://pokeapi.co/api/v2/pokemon?limit=160")
    .then(response => response.json())
    .then(data => {
        const exposition = document.querySelector("#exposition");
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonDetails => {
                    const pokemonElement = document.createElement("li");
                    const type = pokemonDetails.types[0].type.name;
                    pokemonElement.setAttribute('data-type', type); // Ajoutez cette ligne pour stocker le type
                    pokemonElement.style.backgroundColor = colors[type] || '#FFF';
                    
                    // Création de l'élément `li` avec toutes les informations nécessaires
                    pokemonElement.innerHTML = `
                        <img src="${pokemonDetails.sprites.front_default}" alt="${type}" class="pokemonImage">
                        <span>${pokemonDetails.name}</span>
                        <input type="text" value="${Math.floor(Math.random() * 100) + " $"}" readonly>
                        <button>Voir</button>
                    `;
                    exposition.appendChild(pokemonElement);
                });
        });
    });


     //Trier les pokemon du plus cher au moins cher et les afficher dans l'ordre dans l'index.html en utilisant le sélecteur select id="tri" en choisissant les options "plus" et "moins"
     const tri = document.querySelector("#tri");
tri.addEventListener("change", (event) => {
    const exposition = document.querySelector("#exposition");
    const pokemonElements = exposition.querySelectorAll("li");
    const tableau = [];

    pokemonElements.forEach((element) => {
        const pokemonName = element.querySelector("span").textContent;
        const pokemonPrice = element.querySelector("input").value;
        const pokemonImage = element.querySelector("img").getAttribute("src");
        const pokemonType = element.getAttribute("data-type"); // Vous pouvez maintenant récupérer le type
        tableau.push({ name: pokemonName, price: pokemonPrice, image: pokemonImage, type: pokemonType });
    });
     
         // Trier le tableau en fonction du prix
         tableau.sort((a, b) => {
             const priceA = parseInt(a.price, 10);
             const priceB = parseInt(b.price, 10);
             return (event.target.value === "plus" ? priceB - priceA : priceA - priceB);
         });
     
         // Vider la div #exposition
         exposition.innerHTML = "";
     
         // Afficher les Pokémon triés dans la div #exposition
         tableau.forEach((pokemon) => {
             const pokemonElement = document.createElement("li");
             pokemonElement.style.backgroundColor = colors[pokemon.type] || '#FFF'; // Appliquer la couleur de fond
             pokemonElement.innerHTML = `
                 <img src="${pokemon.image}" alt="${pokemon.type}" class="pokemonImage">
                 <span>${pokemon.name}</span>
                 <input type="text" value="${pokemon.price}" readonly>
                 <button>Voir</button>
             `;
             exposition.appendChild(pokemonElement);
         });
     });

    // au click sur le bouton on passe à la page produits.html  
    
    const pokemonChoisi = document.querySelector("#exposition");
    pokemonChoisi.addEventListener("click", (event) => {
    const pokemonChoisi = event.target.parentElement;
    const pokemonImage = pokemonChoisi.querySelector("img").getAttribute("src");
    const pokemonName = pokemonChoisi.querySelector("span").textContent;
    const pokemonPrice = pokemonChoisi.querySelector("input").value;
    const pokemonType = pokemonChoisi.getAttribute("data-type");
    
    // Effectuer la requête fetch et attendre les données
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((response) => response.json())
        .then((data) => {
            const stats = data.stats.map(stat => stat.base_stat);

            // Maintenant que vous avez les stats, vous pouvez les stocker dans le local storage
            localStorage.setItem("stats", JSON.stringify(stats));
            console.log(localStorage.getItem("stats"));

            // Stocker les autres informations dans le local storage
            const tableau = [pokemonName, pokemonPrice, pokemonImage, pokemonType];
            localStorage.setItem("pokemon", JSON.stringify(tableau));
            console.log(localStorage.getItem("pokemon"));

            // Redirection après un délai
            setTimeout(() => {
                window.location.href = "produits.html";
            }, 1000);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});



    function panier() {
        const nbPanier = document.querySelector("#nb-panier");
        if (localStorage.getItem('panier') === null) {
          return; 
        }
        const panier = JSON.parse(localStorage.getItem('panier'));
        const nbPokemon = panier.length / 1;
        // On affiche le nombre de Pokémon dans le panier dans l'élément 'nb-panier'
        nbPanier.textContent = nbPokemon;
        // On affiche le panier dans la console
        console.log(panier);
      }
      panier(); // Don't forget to call the function