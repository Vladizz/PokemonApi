import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";

export default function App() {
  return (
    <div>
      <Route path="/" exact component={PokemonList} />
      <Route path="/Pokemons/:id" exact component={Pokemon} />
    </div>
  );
}
