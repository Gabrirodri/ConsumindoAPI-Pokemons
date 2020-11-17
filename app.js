//URL de onde vem os dados da API
const getUrlPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//Pega os dados da API e preenche um ARRAY de 150 posições
const generatePokemonsPromises = () => Array(150).fill().map((_, index) =>
fetch(getUrlPokemons(index + 1)).then(response => response.json()))

//Gera o HTML 
const generateHTML = (pokemons) => pokemons.reduce((accumulator, {name, id, types}) =>{
    const elementTypes = types.map(typeinfo => typeinfo.type.name)       
        accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image "  alt"${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`
        return accumulator
    },'') 


const insertPokemonsInToPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonsArray = generatePokemonsPromises()
Promise.all(pokemonsArray).then(generateHTML).then(insertPokemonsInToPage )
