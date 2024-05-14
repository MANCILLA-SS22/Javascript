import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  //Remember that "props.children" stands for all those functions (components) inside <Layout> in "_app.js". 
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
