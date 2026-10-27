export default function TypeBadges({ types }) {
  // Mew possui uma lista de tipos vazia no arquivo original.
  if (!types.length) return <span className="type">Tipo não informado</span>;
  return (
    <div className="type-badges">
      {types.map((type) => (
        <span className={`type type-${type.name.toLowerCase()}`} key={type.id}>
          {type.name}
        </span>
      ))}
    </div>
  );
}
