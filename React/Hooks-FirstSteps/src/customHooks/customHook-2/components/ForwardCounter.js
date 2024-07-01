import useCounter from '../hooks/use-count';
import Card from './Card';

function ForwardCounter() {
  const counter = useCounter();
  
  return <Card>{counter}</Card>;
};

export default ForwardCounter;
