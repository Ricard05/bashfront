function Skills({ icono, titulo, texto }) {
  return (
    <>
      <div className="col-md-4 skills">
        <p className="icono-skill fs-1">{icono}</p>

        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
    </>
  );
}

export default Skills;
