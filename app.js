const Fetchpokemons = () => {
const getUrlPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const pokemonsArray = []
for(let i = 1; i<=150;i++){
    pokemonsArray.push(fetch(getUrlPokemons(i)).then(response => response.json()).then(pokemons => pokemons))
}
Promise.all(pokemonsArray).then((pokemons) => {
    const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
    const types = pokemon.types.map(typeinfo => typeinfo.type.name)
        
        accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image "  alt"${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
        <h2 class="card-title">${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
        </li>`
        return accumulator
    },'')
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = lisPokemons
});
Promise.all(pokemonsArray).then((pokemons2) => {
console.log(pokemons2)
})

}

Fetchpokemons()