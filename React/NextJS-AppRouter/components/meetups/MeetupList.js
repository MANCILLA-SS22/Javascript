import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {

  function render(){
    const res = props.values.map(function(meetup){
      return <MeetupItem key={meetup.id} id={meetup.id} image={meetup.image} title={meetup.title} address={meetup.address} />
    });

    return res;
  }

  return (
    <ul className={classes.list}>
      {render()}
    </ul>
  );
}

export default MeetupList;
