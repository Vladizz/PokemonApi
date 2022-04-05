


export default function startQueryToApi(url) {
  const urlToFetch = url || `https://pokeapi.co/api/v2/pokemon?limit=10&offset=20`
  let wasResolved = false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!wasResolved) {
        wasResolved = true
        resolve(JSON.parse(localStorage.getItem("pokemons")))
      }
    }, 3000);
    fetch(urlToFetch)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        return Promise.all(
          data.results.map(p => {
            return fetch(p.url).then(response => response.json());
          })
        );
        // setPokemons(data.results);
      })
      .then(pokemons => {
        localStorage.setItem("pokemons",JSON.stringify(pokemons));
        if (!wasResolved) {
          wasResolved = true
          return resolve(pokemons);
        }
      })
      .catch(() => {
        if (!wasResolved) {
          wasResolved = true
          resolve(JSON.parse(localStorage.getItem("pokemons")))
        }
      });
  });
}

