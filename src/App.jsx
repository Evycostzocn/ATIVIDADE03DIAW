import { useState } from "react";
import data from "./data/pokedex-data.json";
import { filterPokemon } from "./data/pokedex.js";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import PokemonList from "./components/PokemonList.jsx";
import PokemonDetails from "./components/PokemonDetails.jsx";
import Trainers from "./components/Trainers.jsx";
import "./css/App.css";
const types = data.types.filter((type) =>
  data.pokemon.some((pokemon) =>
    pokemon.types.some((item) => item.id === type.id),
  ),
);
export default function App() {
  const [page, setPage] = useState("pokemon");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = filterPokemon(data.pokemon, query, type);
  function clearFilters() {
    setQuery("");
    setType("");
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <Header page={page} onNavigate={setPage} />
      <main id="main" tabIndex={-1}>
        <section className="hero">
          <div>
            <p className="eyebrow">GUIA DE CAMPO / REGIÃO DE KANTO</p>
            <h1>
              {page === "pokemon" ? (
                <>
                  Toda jornada começa
                  <br />
                  com uma descoberta.
                </>
              ) : (
                <>
                  Grandes jornadas.
                  <br />
                  Equipes inesquecíveis.
                </>
              )}
            </h1>
            <p>
              {page === "pokemon"
                ? "Explore os Pokémon, conheça seus tipos e descubra cada atributo."
                : "Conheça os treinadores e os Pokémon que fazem parte de suas equipes."}
            </p>
          </div>
          <div className="hero-counter">
            <strong>
              {page === "pokemon" ? data.pokemon.length : data.trainers.length}
            </strong>
            <span>
              {page === "pokemon"
                ? "POKÉMON NO ARQUIVO"
                : "TREINADORES NO ARQUIVO"}
            </span>
            <span className="status-dot">● Dados locais disponíveis</span>
          </div>
        </section>
        {page === "pokemon" ? (
          <>
            <section className="toolbar" aria-label="Pesquisa e filtros">
              <SearchBar query={query} onChange={setQuery} />
              <Filters
                types={types}
                type={type}
                onChange={setType}
                onClear={clearFilters}
              />
            </section>
            <section aria-labelledby="collection-title">
              <div className="section-heading">
                <h2 id="collection-title">Explore a coleção</h2>
                <p role="status">
                  {filtered.length} de {data.pokemon.length} Pokémon
                </p>
              </div>
              <PokemonList
                pokemon={filtered}
                onSelect={setSelected}
                onClear={clearFilters}
              />
            </section>
          </>
        ) : (
          <section aria-labelledby="trainers-title">
            <div className="section-heading">
              <h2 id="trainers-title">Treinadores de Kanto</h2>
              <p>{data.trainers.length} treinadores</p>
            </div>
            <Trainers
              trainers={data.trainers}
              pokemon={data.pokemon}
              onSelect={setSelected}
            />
          </section>
        )}
      </main>
      <footer>
        POKÉDEX / KANTO <span>Atividade 03 · React + Vite</span>
      </footer>
      {selected && (
        <PokemonDetails pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
