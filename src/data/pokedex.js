export const stats = [
  ["hp", "HP"],
  ["attack", "Ataque"],
  ["defense", "Defesa"],
  ["specialAttack", "Ataque Especial"],
  ["specialDefense", "Defesa Especial"],
  ["speed", "Velocidade"],
];
export const formatId = (id) => String(id).padStart(3, "0");
export function filterPokemon(pokemon, query, type) {
  const search = query.trim().toLowerCase();
  return pokemon.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(search) ||
      (/^\d+$/.test(search) && entry.id === Number(search));
    return (
      matchesSearch &&
      (!type || entry.types.some((item) => String(item.id) === type))
    );
  });
}
// Preserve cada posição da equipe: o JSON permite várias ocorrências da mesma espécie.
export function getTeam(trainer, pokemon) {
  return trainer.pokemonIds.map((id) =>
    pokemon.find((entry) => entry.id === id),
  );
}
