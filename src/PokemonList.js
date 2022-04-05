// import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import startQueryToApi from "./apipokemon";
import "./PokemonList.css";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    startQueryToApi().then(pokemons => {
      setPokemons(pokemons);
    });
  }, []);

  let pokPic = "";

  const nextPage = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);

    startQueryToApi(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newOffset}`
    ).then(pokemons => {
      setPokemons(pokemons);
    });
  };

  const previousPage = () => {
    const newOffset = offset - 10;
    setOffset(newOffset);
    startQueryToApi(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newOffset}`
    ).then(pokemons => {
      setPokemons(pokemons);
    });
  };

  return (
    <div>
      {/* <div className="app">Lol</div>; */}
      {pokemons.map(pokemon => {
        return (
          <div className="wrap">
            <Link key={pokemon.name} to={`/Pokemons/${pokemon.name}`}>
              <img src={pokemon.sprites.front_default}></img>
              <p>{pokemon.name}</p>
            </Link>
          </div>
        );
      })}
      <div className="buttonsWrap">
        <button onClick={previousPage}>previous</button>
        <button onClick={nextPage}>next</button>
      </div>
      {/* <Route path="/pokemons/:id" exact component={Pokemon} /> */}
    </div>
  );
}
