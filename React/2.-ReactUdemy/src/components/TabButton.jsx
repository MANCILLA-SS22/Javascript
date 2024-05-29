//Metodo 1
function TabButton({ children, isSelected, ...props }) {
  return (
    <li>
      <button className={isSelected ? 'active' : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}

// export default TabButton;

//Metodo 2
// function TabButton({ children, isSelected, onClick}) {
//   return (
//     <li>
//       <button className={isSelected ? 'active' : undefined} onClick={onClick} >
//         {children}
//       </button>
//     </li>
//   );
// }

// export default TabButton;

//Metodo 3
// function TabButton(props) {
//   return (
//     <li>
//       <button className={props.isSelected ? 'active' : undefined} onClick={props.onClick} >
//         {props.children}
//       </button>
//     </li>
//   );
// }

// export default TabButton;