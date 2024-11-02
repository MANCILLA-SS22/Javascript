function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className='fallback-text'>{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {
            places.map(event => (
              <li key={event.id} className="place-item">
                <button onClick={() => onSelectPlace(event.id)}>
                  <img src={event.image.src} alt={event.image.alt} />
                  <h3>{event.title}</h3>
                </button>
              </li>
              )
            )
          }
        </ul>
      )}
      
    </section>
  );
}

export default Places;