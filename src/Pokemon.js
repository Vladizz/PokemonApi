import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Pokemon.css";

export default function Pokemon() {
  const params = useParams();
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  const queryForPokemon = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`).then(
      data => {
        return data.json();
      }
    );
    // .then(formatteddata => {
    //   setName(formatteddata.forms.name);
    //   setPic(formatteddata.sprites.front_default);
    // });
  };

  useEffect(() => {
    queryForPokemon().then(formatteddata => {
      setName(formatteddata.name);
      setPic(formatteddata.sprites.front_default);
    });
  }, []);

  return (
    <div className="wrap">
      <img className="pocpic" src={pic}></img>
      <p>{name}</p>
    </div>
  );
}


