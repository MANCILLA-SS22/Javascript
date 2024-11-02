import React, { memo } from 'react';

function ComponenteHijo({texto, cuenta, sumarUno}){
	console.log(`${texto} Renderizado`);
	
	return (
		<div className="caja">
			<p>{texto}</p>
			<h1>{cuenta}</h1>
			<button className="boton" onClick={sumarUno}>+1</button>
		</div>
	);
}

export default memo(ComponenteHijo); // "memo" se utiliza en COMPONENTES