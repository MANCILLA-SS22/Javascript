import CoreConcept from './CoreConcept.jsx';
import { CORE_CONCEPTS } from '../data.js';

function CoreConcepts() {
  
  function render(){
    const res = CORE_CONCEPTS.map(function(event){
      return <CoreConcept key={event.title} {...event} /> //Better way
      // return <CoreConcept key={event.title} description={event.description} image={event.image} title={event.title} /> //Normal way
    });

    return res;
  }

  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {render()}
      </ul>
    </section>
  );
}

export default CoreConcepts;