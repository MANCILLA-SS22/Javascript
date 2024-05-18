import Accordion from './components/Accordion/Accordion.jsx';
import SearchabeList from './components/SearchableList/SearchabeList.jsx';
import Place from './Place.jsx';
import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';

const PLACES = [
  {
    id: 'african-savanna',
    image: savannaImg,
    title: 'African Savanna',
    description: 'Experience the beauty of nature.',
  },
  {
    id: 'amazon-river',
    image: amazonImg,
    title: 'Amazon River',
    description: 'Get to know the largest river in the world.',
  },
  {
    id: 'caribbean-beach',
    image: caribbeanImg,
    title: 'Caribbean Beach',
    description: 'Enjoy the sun and the beach.',
  },
  {
    id: 'desert-dunes',
    image: desertImg,
    title: 'Desert Dunes',
    description: 'Discover the desert life.',
  },
  {
    id: 'forest-waterfall',
    image: forestImg,
    title: 'Forest Waterfall',
    description: 'Listen to the sound of the water.',
  },
];

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>

        <Accordion className="accordion">

          <Accordion.Item className="accordion-item" id="experience">
            <Accordion.Title className="accordion-item-title">We got 20 years of experience</Accordion.Title>
            <Accordion.Content className="accordion-item-content" >
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>We are in the business of planning highly individualized vacation trips for more than 20 years. </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item className="accordion-item" id="local-guides">
            <Accordion.Title className="accordion-item-title">We are working with local guides</Accordion.Title>
            <Accordion.Content className="accordion-item-content" >
              <article>
                <p>We are not doing this along from our office.</p>
                <p>Instead, we are working with local guides to ensure a safe andpleasant vacation.</p>
              </article>
            </Accordion.Content>
          </Accordion.Item>

        </Accordion>
      </section>
      <section>
        <SearchabeList items={PLACES} itemKeyFn={(item) => item.id}>
          { (item) => <Place item={item}/> } 
        </SearchabeList>

        <SearchabeList items={['item 1', 'item 2']} itemKeyFn={(item) => item.id}>
          { (item) => item }
        </SearchabeList>
      </section>
    </main>
  );
}

export default App;

//In React, the children prop is a special prop that allows you to pass components or elements as children to a React component.When you use { children } in the return statement of a component, 
//you are rendering whatever is passed as children to that component.It could be a single element, multiple elements, or even other React components.
//On the other hand, when you use { children(item) } in the return statement, you are treating children as a function and passing the item as an argument to that function. 
//This implies that children is expected to be a function that can accept some input(item in this case) and return a React element.