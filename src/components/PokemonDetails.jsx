import PokemonImage from "./PokemonImage.jsx";
import { useEffect, useRef } from "react";
import { formatId } from "../data/pokedex.js";
import PokemonStats from "./PokemonStats.jsx";
import TypeBadges from "./TypeBadges.jsx";
import "../css/PokemonDetails.css";
export default function PokemonDetails({ pokemon, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const origin = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (origin instanceof HTMLElement && origin.isConnected) origin.focus();
    };
  }, []);
  // O dialog nativo mantém o foco dentro do modal e dispara cancel ao pressionar Escape.
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="pokemon-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-top">
          <span className="eyebrow">Registro Nº {formatId(pokemon.id)}</span>
          <button
            autoFocus
            className="close-button"
            onClick={onClose}
            aria-label="Fechar detalhes"
          >
            ✕
          </button>
        </div>
        <PokemonImage pokemon={pokemon} size="detail" />
        <h2 id="pokemon-title">{pokemon.name}</h2>
        <TypeBadges types={pokemon.types} />
        <h3>Atributos base</h3>
        <PokemonStats pokemon={pokemon} />
        <p className="modal-note">Dados do arquivo original da atividade.</p>
      </div>
    </dialog>
  );
}
