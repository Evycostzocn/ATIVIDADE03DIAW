import test from "node:test";
import assert from "node:assert/strict";
import {
  loadPokemonImage,
  markPokemonImageUnavailable,
} from "../src/services/pokemonImages.js";

test("compartilha requisição em andamento e URL resolvida", async (t) => {
  let resolve;
  const fetchMock = t.mock.method(
    globalThis,
    "fetch",
    () =>
      new Promise((r) => {
        resolve = r;
      }),
  );
  const first = loadPokemonImage(1);
  const second = loadPokemonImage(1);
  assert.equal(first, second);
  resolve({
    ok: true,
    json: async () => ({
      sprites: { front_default: "https://example.com/1.png" },
    }),
  });
  assert.equal(await first, "https://example.com/1.png");
  assert.equal(await loadPokemonImage(1), "https://example.com/1.png");
  assert.equal(fetchMock.mock.callCount(), 1);
  assert.equal(
    fetchMock.mock.calls[0].arguments[0],
    "https://pokeapi.co/api/v2/pokemon/1",
  );
});

for (const [id, label, response] of [
  [2, "erro HTTP", () => ({ ok: false })],
  [3, "falha de rede", () => Promise.reject(new Error("offline"))],
  [
    4,
    "imagem nula",
    () => ({
      ok: true,
      json: async () => ({ sprites: { front_default: null } }),
    }),
  ],
  [5, "sprites ausentes", () => ({ ok: true, json: async () => ({}) })],
  [
    6,
    "JSON inválido",
    () => ({
      ok: true,
      json: async () => {
        throw new Error("JSON inválido");
      },
    }),
  ],
  [
    7,
    "timeout",
    () => Promise.reject(new DOMException("Tempo esgotado", "TimeoutError")),
  ],
]) {
  test(`${label}: retorna alternativa e não repete a chamada`, async (t) => {
    const fetchMock = t.mock.method(globalThis, "fetch", response);
    assert.equal(await loadPokemonImage(id), null);
    assert.equal(await loadPokemonImage(id), null);
    assert.equal(fetchMock.mock.callCount(), 1);
  });
}

test("falha do arquivo de imagem invalida URL sem consultar novamente", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => ({
      sprites: { front_default: "https://example.com/broken.png" },
    }),
  }));
  assert.equal(await loadPokemonImage(8), "https://example.com/broken.png");
  markPokemonImageUnavailable(8);
  assert.equal(await loadPokemonImage(8), null);
  assert.equal(fetchMock.mock.callCount(), 1);
});
