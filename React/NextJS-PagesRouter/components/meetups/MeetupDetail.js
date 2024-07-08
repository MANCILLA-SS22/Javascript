import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.values.image} alt={props.values.title} />
      <h1>{props.values.title}</h1>
      <address>{props.values.address}</address>
      <p>{props.values.description}</p>
    </section>
  );
}

export default MeetupDetail;
