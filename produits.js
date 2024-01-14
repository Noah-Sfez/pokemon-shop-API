
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



fetch("https://pokeapi.co/api/v2/pokemon?limit=750")
    .then((response) => response.json())

    .then((data) => {
        data.results.forEach((pokemon) => {
        const card = document.querySelector("#card");
        if (localStorage.getItem("pokemon") === null) {
            return;
        }
        if (localStorage.getItem("pokemon") === null) {
            return;
        }
        
        const tableau = JSON.parse(localStorage.getItem("pokemon"));
       
        const pokemonName = tableau[0];
        const pokemonPrice = tableau[1];
        const pokemonImage = tableau[2];
        const pokemonType = tableau[3];
        
        const image = card.querySelector("img");
        const h2 = card.querySelector("h2");
        image.setAttribute("src", `${pokemonImage}`);
        h2.textContent = pokemonName;
       
        const span = card.querySelector("p");
        span.textContent = pokemonPrice;

        
        card.style.backgroundColor = colors[pokemonType] || 'white'; 

        const listItems = card.querySelectorAll("li");
        listItems.forEach(li => {
            li.style.backgroundColor = colors[pokemonType] || 'white'; 
        });
        
});
});

const stats = JSON.parse(localStorage.getItem("stats"));
console.log(stats);

const statNames = ["HP", "Attack", "Defense", "Special-Attack", "Special-Defense", "Speed"];

const statsDiv = document.querySelector("#stats");

stats.forEach((stat, index) => {
    const statElement = document.createElement("li");
   
    statElement.textContent = `${statNames[index]}: ${stat}`;
    statsDiv.appendChild(statElement);
});

    

        
        const btnPanier = document.querySelector("#btn-panier");
        const ajoutContinue = document.querySelector("#btn-ajoutContinue");

        btnPanier.addEventListener("click", () => {
        
            let panier = JSON.parse(localStorage.getItem("panier")) || [];
            
            const nouveauPokemon = JSON.parse(localStorage.getItem("pokemon"));
            if (nouveauPokemon === null) {
                console.log("Aucun nouveau Pokémon à ajouter");
                return;
            }
           
            const pokemonData = {
                name: nouveauPokemon[0],
                price: nouveauPokemon[1],
                image: nouveauPokemon[2]
            };
            
            panier.push(pokemonData);
            
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log("Après mise à jour, panier contient : ", panier);

            const messageDiv = document.getElementById("message");
            messageDiv.innerText = `${nouveauPokemon[0]} a été ajouté au panier`;
            const messageContainer = document.getElementById("message-container");
            messageContainer.style.display = "block";
            messageDiv.classList.add("pop");

            
            setTimeout(() => {
                messageDiv.classList.add("fadeOut");
                setTimeout(() => {
                    messageContainer.style.display = "none";
                    messageDiv.classList.remove("pop", "fadeOut");
                    window.location.href = "panier.html";
                }, 1000); 
            }, 2000); 
        });
        ajoutContinue.addEventListener("click", () => {
            let panier = JSON.parse(localStorage.getItem("panier")) || [];
            
            const nouveauPokemon = JSON.parse(localStorage.getItem("pokemon"));
            if (nouveauPokemon === null) {
                console.log("Aucun nouveau Pokémon à ajouter");
                return;
            }
           
            const pokemonData = {
                name: nouveauPokemon[0],
                price: nouveauPokemon[1],
                image: nouveauPokemon[2]
            };
            
            panier.push(pokemonData);
           
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log("Après mise à jour, panier contient : ", panier);

            const messageDiv = document.getElementById("message");
            messageDiv.innerText = `${nouveauPokemon[0]} a été ajouté au panier`;
            const messageContainer = document.getElementById("message-container");
            messageContainer.style.display = "block";
            messageDiv.classList.add("pop");

            
            setTimeout(() => {
                messageDiv.classList.add("fadeOut");
                setTimeout(() => {
                    messageContainer.style.display = "none";
                    messageDiv.classList.remove("pop", "fadeOut");
                    window.location.href = "index.html";
                }, 1000); 
            }, 1900); 
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
          



