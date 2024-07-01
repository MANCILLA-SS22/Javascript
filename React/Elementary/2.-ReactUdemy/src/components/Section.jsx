//Metodo 1
function Section({ children, title, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default Section;

//Metodo 2
// function Section({ children, title, id }) {
//   return (
//     <section id={id}>
//       <h2>{title}</h2>
//       {children}
//     </section>
//   );
// }

// export default Section;

//Metodo 3
// function Section(props) {
//   return (
//     <section id={props.id}>
//       <h2>{props.title}</h2>
//       {props.children}
//     </section>
//   );
// }

// export default Section;