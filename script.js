
// vider le tableau "tableau" du local storage
localStorage.removeItem("tableau");
// vider le tableau "stats" du local storage
localStorage.removeItem("stats");
// 1. récupérer les données de l'api

fetch("https://pokeapi.co/api/v2/pokemon?limit=160")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((pokemon) => {
            // créer une liste d'éléments dans la div id="exposition"
            const exposition = document.querySelector("#exposition");
            const pokemonElement = document.createElement("li");
            pokemonElement.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                data.results.indexOf(pokemon) + 1
            }.png" alt="pokemon" class="pokemonImage"><span>${pokemon.name}</span>`;
            // Créer un input de type text les li et y mettre une valeur aléatoire entre 1 et 100 que l'on ne peut pas modifier
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            // mettre une valeur aléatoire entre 1 et 100 et y ajouter le signe $ après
            input.value = Math.floor(Math.random() * 100) + " $";
            input.setAttribute("readonly", true);
            pokemonElement.appendChild(input);
            // ajouter une balise <a> qui redirige vers la page produits.html avec comme texte "acheter" à chaque li
            const button = document.createElement("button");
            button.textContent = "Voir";
            pokemonElement.appendChild(button);
            exposition.appendChild(pokemonElement);
        });
    });

     //Trier les pokemon du plus cher au moins cher et les afficher dans l'ordre dans l'index.html en utilisant le sélecteur select id="tri" en choisissant les options "plus" et "moins"
    const tri = document.querySelector("#tri");
    tri.addEventListener("change", (event) => {
        const exposition = document.querySelector("#exposition");
        const pokemonElement = exposition.querySelectorAll("li");
        const tableau = [];
        pokemonElement.forEach((pokemon) => {
            const pokemonName = pokemon.querySelector("span").textContent;
            const pokemonPrice = pokemon.querySelector("input").value;
            const pokemonImage = pokemon.querySelector("img").getAttribute("src");
            tableau.push({ name: pokemonName, price: pokemonPrice, image: pokemonImage });
        });
        // trier le tableau en fonction du prix
        if (event.target.value === "plus") {
            tableau.sort((a, b) => {
                return parseInt(b.price) - parseInt(a.price);
            });
        } else if (event.target.value === "moins") {
            tableau.sort((a, b) => {
                return parseInt(a.price) - parseInt(b.price);
            });
        }
        // vider la div #exposition
        exposition.innerHTML = "";
        // afficher les pokemons triés dans la div #exposition
        tableau.forEach((pokemon) => {
            const pokemonElement = document.createElement("li");
            pokemonElement.innerHTML = `<img src="${pokemon.image}" alt="pokemon" class="pokemonImage"><span>${pokemon.name}</span>`;
            // Créer un input de type text les li et y mettre une valeur aléatoire entre 1 et 100 que l'on ne peut pas modifier
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            // mettre une valeur aléatoire entre 1 et 100 et y ajouter le signe $ après
            input.value = pokemon.price;
            input.setAttribute("readonly", true);
            pokemonElement.appendChild(input);
            // ajouter une balise <a> qui redirige vers la page produits.html avec comme texte "acheter" à chaque li
            const button = document.createElement("button");
            button.textContent = "Voir";
            pokemonElement.appendChild(button);
            exposition.appendChild(pokemonElement);
        });
    });

    fetch("https://pokeapi.co/api/v2/pokemon?limit=160")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((pokemon) => {
            fetch(pokemon.url) // Récupérer les détails de chaque Pokémon
                .then((response) => response.json())
                .then((pokemonDetails) => {
                    const exposition = document.querySelector("#exposition");
                    const pokemonElement = document.createElement("li");

                    // Définir la couleur de fond en fonction du type principal du Pokémon
                    const type = pokemonDetails.types[0].type.name;
                    console.log(type);
                    const colors = {
                        fire: '#F08030',
                        water: '#6890F0',
                        grass: '#78C850',
                        electric: '#F8D030',
                        psychic: '#F85888',
                        // ... autres types et couleurs
                    };
                    console.log(colors[type]);
                    

                    pokemonElement.innerHTML = `<img src="${pokemonDetails.sprites.front_default}" alt="${type}" class="pokemonImage"><span>${pokemonDetails.name}</span>`;
                    pokemonElement.style.backgroundColor = colors[type] || '#FFF';

                    // ... Reste du code pour ajouter l'input et le bouton
                    exposition.appendChild(pokemonElement);
                });
        });
    });





    // au click sur le bouton on passe à la page produits.html  
    
    const pokemonChoisi = document.querySelector("#exposition");
    pokemonChoisi.addEventListener("click", (event) => {
    const pokemonChoisi = event.target.parentElement;
    const pokemonImage = pokemonChoisi.querySelector("img").getAttribute("src");
    const pokemonName = pokemonChoisi.querySelector("span").textContent;
    const pokemonPrice = pokemonChoisi.querySelector("input").value;
    
    // Effectuer la requête fetch et attendre les données
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((response) => response.json())
        .then((data) => {
            const stats = data.stats.map(stat => stat.base_stat);

            // Maintenant que vous avez les stats, vous pouvez les stocker dans le local storage
            localStorage.setItem("stats", JSON.stringify(stats));
            console.log(localStorage.getItem("stats"));

            // Stocker les autres informations dans le local storage
            const tableau = [pokemonName, pokemonPrice, pokemonImage];
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