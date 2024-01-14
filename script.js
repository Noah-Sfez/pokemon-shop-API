

localStorage.removeItem("tableau");

localStorage.removeItem("stats");


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
};

function initialize() {
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
                    pokemonElement.setAttribute('data-type', type); 
                    pokemonElement.style.backgroundColor = colors[type] || '#FFF';
                    
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
}
initialize();

    const tri = document.querySelector("#tri");
    tri.addEventListener("change", (event) => {
        const exposition = document.querySelector("#exposition");
        const pokemonElements = exposition.querySelectorAll("li");
        const tableau = [];
        const selectedValue = event.target.value;
        if (selectedValue === "default") {
            exposition.innerHTML = "";
            initialize();
        } else {

        pokemonElements.forEach((element) => {
            const pokemonName = element.querySelector("span").textContent;
            const pokemonPrice = element.querySelector("input").value;
            const pokemonImage = element.querySelector("img").getAttribute("src");
            const pokemonType = element.getAttribute("data-type"); 
            console.log(pokemonType);
            tableau.push({ name: pokemonName, price: pokemonPrice, image: pokemonImage, type: pokemonType });
        });
        
        tableau.sort((a, b) => {
            const priceA = parseInt(a.price, 10);
            const priceB = parseInt(b.price, 10);
            return (event.target.value === "plus" ? priceB - priceA : priceA - priceB);
        });
    
        exposition.innerHTML = "";
         
         tableau.forEach((pokemon) => {
             const pokemonElement = document.createElement("li");
             pokemonElement.setAttribute('data-type', pokemon.type);
             pokemonElement.style.backgroundColor = colors[pokemon.type] || '#FFF'; 
             pokemonElement.innerHTML = `
                 <img src="${pokemon.image}" alt="${pokemon.type}" class="pokemonImage">
                 <span>${pokemon.name}</span>
                 <input type="text" value="${pokemon.price}" readonly>
                 <button>Voir</button>
             `;
             exposition.appendChild(pokemonElement);
         });
        }
     });

    
    let isSelectMode = false;
    const pokemonChoisi = document.querySelector("#exposition");
    pokemonChoisi.addEventListener("click", (event) => {
        if (isSelectMode) {
            return;
        }
    const pokemonChoisi = event.target.parentElement;
    const pokemonImage = pokemonChoisi.querySelector("img").getAttribute("src");
    const pokemonName = pokemonChoisi.querySelector("span").textContent;
    const pokemonPrice = pokemonChoisi.querySelector("input").value;
    const pokemonType = pokemonChoisi.getAttribute("data-type");
    
    
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((response) => response.json())
        .then((data) => {
            const stats = data.stats.map(stat => stat.base_stat);

            
            localStorage.setItem("stats", JSON.stringify(stats));
            console.log(localStorage.getItem("stats"));

            const tableau = [pokemonName, pokemonPrice, pokemonImage, pokemonType];
            localStorage.setItem("pokemon", JSON.stringify(tableau));
            console.log(localStorage.getItem("pokemon"));

            
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
        
        nbPanier.textContent = nbPokemon;
        
        console.log(panier);
      }
      panier(); 




      document.addEventListener('DOMContentLoaded', () => {
        const selectButton = document.getElementById('select-pokemon');
        const addToCartButton = document.getElementById('add-to-cart');
        const exposition = document.querySelector("#exposition");
    
        selectButton.addEventListener('click', () => {
            isSelectMode = !isSelectMode; 
            selectButton.textContent = isSelectMode ? "Désélectionner" : "Sélectionner";
            const allPokemon = exposition.querySelectorAll("li");
            if (isSelectMode) {
                selectButton.textContent = "Désélectionner";
                addToCartButton.style.display = 'block';
        
                allPokemon.forEach(pokemonElement => {
                    
                    let checkbox = pokemonElement.querySelector('.pokemon-checkbox');
                    if (!checkbox) {
                        checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'pokemon-checkbox';
                        pokemonElement.insertBefore(checkbox, pokemonElement.firstChild);
                    }
                    
                    
                    checkbox.addEventListener('change', function() {
                        if (this.checked) {
                            pokemonElement.classList.add('checked-pokemon', 'shake');
                        } else {
                            pokemonElement.classList.remove('checked-pokemon');
                            pokemonElement.classList.remove('shake');
                        }
                    });
                });
            } else {
                
                selectButton.textContent = "Sélectionner";
                addToCartButton.style.display = 'none';
        
                allPokemon.forEach(pokemonElement => {
                    pokemonElement.classList.remove('checked-pokemon'); 
                    pokemonElement.classList.remove('shake');
                    const checkbox = pokemonElement.querySelector('.pokemon-checkbox');
                    if (checkbox) {
                        checkbox.parentElement.removeChild(checkbox);
                    }
                });
            }
        });
    
        addToCartButton.addEventListener('click', () => {
            
            let panier = JSON.parse(localStorage.getItem("panier")) || [];

            const selectedCheckboxes = document.querySelectorAll(".pokemon-checkbox:checked");
            selectedCheckboxes.forEach(checkbox => {
            const pokemonElement = checkbox.closest('li');
            const pokemonName = pokemonElement.querySelector("span").textContent;
            const pokemonPrice = pokemonElement.querySelector("input[type='text']").value;
            const pokemonImage = pokemonElement.querySelector("img").getAttribute("src");
            const pokemonData = {
                name: pokemonName,
                price: pokemonPrice,
                image: pokemonImage
            };
            panier.push(pokemonData);
    });

    
    if (panier.length === 0) {
        console.log("Aucun Pokémon sélectionné à ajouter au panier");
        return;
    }

    
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Après mise à jour, panier contient : ", panier);

    
    setTimeout(() => {
        window.location.href = "panier.html";
    }, 500);
        });
    });
    
