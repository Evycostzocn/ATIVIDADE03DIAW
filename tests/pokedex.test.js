import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterPokemon, getTeam, stats } from "../src/data/pokedex.js";
const data = JSON.parse(
  readFileSync(new URL("../src/data/pokedex-data.json", import.meta.url)),
);
test("arquivo completo, identificadores únicos e seis atributos numéricos", () => {
  assert.equal(data.pokemon.length, 151);
  assert.equal(data.trainers.length, 12);
  assert.equal(new Set(data.pokemon.map((p) => p.id)).size, 151);
  for (const pokemon of data.pokemon)
    for (const [key] of stats)
      assert.equal(typeof pokemon.stats[key], "number");
  assert.equal(filterPokemon(data.pokemon, "", "").length, 151);
});
test("pesquisa parcial, normalização, ID com zeros e nenhum resultado", () => {
  for (const query of ["Bulba", " BULBA ", "1", "001"])
    assert.deepEqual(
      filterPokemon(data.pokemon, query, "").map((p) => p.id),
      [1],
    );
  assert.deepEqual(filterPokemon(data.pokemon, "inexistente", ""), []);
});
test("tipos simples, secundários e combinação de pesquisa e filtro", () => {
  assert.ok(filterPokemon(data.pokemon, "", "2").some((p) => p.id === 4));
  assert.ok(filterPokemon(data.pokemon, "", "10").some((p) => p.id === 6));
  assert.deepEqual(
    filterPokemon(data.pokemon, "bulba", "8").map((p) => p.id),
    [1],
  );
  assert.deepEqual(filterPokemon(data.pokemon, "bulba", "2"), []);
});
test("relações válidas, duplicatas de equipe preservadas e equipe vazia", () => {
  for (const trainer of data.trainers)
    assert.deepEqual(
      getTeam(trainer, data.pokemon).map((p) => p.id),
      trainer.pokemonIds,
    );
  assert.equal(
    getTeam(
      data.trainers.find((t) => t.name === "Koga"),
      data.pokemon,
    ).filter((p) => p.id === 48).length,
    3,
  );
  assert.deepEqual(getTeam({ pokemonIds: [] }, data.pokemon), []);
});

test("Mew mantém os tipos ausentes do arquivo original", () => {
  const [mew] = filterPokemon(data.pokemon, "151", "");
  assert.equal(mew.name, "Mew");
  assert.deepEqual(mew.types, []);
  assert.deepEqual(filterPokemon(data.pokemon, "151", "11"), []);
});
