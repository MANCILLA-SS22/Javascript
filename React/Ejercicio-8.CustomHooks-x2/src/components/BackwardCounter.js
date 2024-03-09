import Card from './Card';
import useCounter from '../hooks/use-count';

function BackwardCounter() {
  const counter = useCounter(false);
  return <Card>{counter}</Card>;
};

export default BackwardCounter;
