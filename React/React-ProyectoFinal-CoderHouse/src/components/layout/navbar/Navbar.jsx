//Forma dinamica
import "../navbar/Navbar.css"
import { Badge } from "@mui/material";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { menuNavigate } from "../../../routes/MenuNavigate";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function Navbar() {
  const {getTotalItems } = useContext(CartContext);
  let totalItems = getTotalItems();

  return (
    <>
      <div className='navegacion p-3 mb-5 container-fluid d-flex justify-content-evenly align-items-center'>

      <a href="/" className='text-white text-decoration-none d-flex justify-content-center'>
        <img style={{width:"60px", marginLeft:"6px"}} src={"../imgs/target.png"} alt="target" />
        <h2 className='m-2 align-self-center'>ImpactGuns</h2>
      </a>

      <ul className="d-flex flex-row justify-content-around align-items-center list-unstyled">
        
        <li className="me-4 dropdown">
          <a className="text-white text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Guns
          </a>

          <ul className="dropdown-menu">
            <li>
              {//el id y el path deben ser iguales para que al usar filer en ItemListContainer, verifique si ambos son iguales y entonces hacer el filtrado. Tambien, debido a que vamos a desestructurar un objeto, los nombres no deben ser diferentes.
                menuNavigate.map(( {id, path, title} ) => { //Como estamos usando un array de objetos, entonces vamos a tener que desestructurar los datos que estan contenidos en este array. 
                  return (
                    <Link className="dropdown-item" key={id} to={path}>
                      {title} <hr className="dropdown-divider"/>
                    </Link>
                  )
                })
              }
            </li>
          </ul>
        </li>

        <li className="me-4 dropdown">
          <a className="text-white text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Ammo
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Rifle Ammo</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Shotgun Ammo</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Assault Rifle Ammo</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Sub Machine Gun Ammo</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Handgun Ammo</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Rimfire Ammo</a></li>
          </ul>
        </li>

        <li className="me-4 dropdown">
          <a className="text-white text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Accessories
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Magazines</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Holsters</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Optics & Sights</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Lasers</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Lights</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Reloading</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Bipods & Tripods</a><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Snap Caps</a><hr className="dropdown-divider"/></li>
          </ul>
        </li>

        <li>
          <a className="text-white text-decoration-none" href="#" role="button"  aria-expanded="false">
            About us
          </a>
        </li>
        
      </ul>

        <div className="me-4">
          <Link to="/carrito">
            <Badge badgeContent={totalItems} showZero color="primary">
              <BsFillCartCheckFill size="30px" />
            </Badge>
          </Link>
        </div>

      

    </div>
    </>
  );
}

export default Navbar;

/* //Forma estatica
import { Badge } from "@mui/material";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Navbar.modules.css";

function Navbar( {children} ) { // "children" es una palabra que ya existe en REACT, por lo que no se debe colocar otro nombre si es que queremos mostrar todos los demas elementos que tengan este navbar.
  console.log();
  return (
    <>
      <div className={styles.containerNavbar}>
        <Link to="/">Comision-43240</Link>
        <ul className={styles.categories}>
          <Link to="/">Limpiar filtros</Link>
          <Link to="/category/urbanas">Urbanas</Link>
          <Link to="/category/deportivas">Deportivas</Link>
        </ul>

        <Link to="/carrito">
          <Badge badgeContent={4} color="primary">
            <BsFillCartCheckFill size="30px" />
          </Badge>
        </Link>
      </div>

      {children}
    </>
  );
}

export default Navbar; */

/* //Forma estatica con react-router (<Outlet/>)
import { Badge } from "@mui/material";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Navbar.modules.css";
import { Outlet } from "react-router-dom"

function Navbar() { // "children" es una palabra que ya existe en REACT, por lo que no se debe colocar otro nombre si es que queremos mostrar todos los demas elementos que tengan este navbar.
  console.log();
  return (
    <>
      <div className={styles.containerNavbar}>
        <Link to="/">Comision-43240</Link>
        <ul className={styles.categories}>
          <Link to="/">Limpiar filtros</Link>
          <Link to="/category/urbanas">Urbanas</Link>
          <Link to="/category/deportivas">Deportivas</Link>
        </ul>

        <Link to="/carrito">
          <Badge badgeContent={4} color="primary">
            <BsFillCartCheckFill size="30px" />
          </Badge>
        </Link>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar; */

/* //Uso de enrutado SIN react router
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CartWidwet from '../../cartWidwet/cartWidwet';

const pages = ['Firearms', 'Accessories', 'About us'];

export function Navbar( {children} ) { // "children" es una palabra que ya existe en REACT, por lo que no se debe colocar otro nombre si es que queremos mostrar todos los demas elementos que tengan este navbar.

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    return (
      <>
          <AppBar position="static">
              <Container maxWidth="xl">
                  <Toolbar disableGutters>
                  <img style={{width:"40px"}} src={"../imgs/target.png"} alt="target" />
                  <Typography id="res" variant="h4" noWrap component="a" href="/" sx={{mr: 2,display: { xs: 'none', md: 'flex' },
                  letterSpacing: '.3rem',color: 'black',textDecoration: 'none', marginLeft:"2px"}}>
                      ImpactGuns 
                  </Typography>
                  
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  
                  <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                      <MenuIcon />
                  </IconButton>
                  
                  <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'left'}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{display: { xs: 'block', md: 'none' }}}>
                      {pages.map((page) => (
                          <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page}</Typography>
                          </MenuItem>
                      ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"flex-end" }}>
                  {pages.map((page) => (
                    <Button id='res' key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block'}}>
                      {page}
                    </Button>
                  ))}
                </Box>
  
                <CartWidwet/>
  
      
              </Toolbar>
            </Container>
          </AppBar>
          {children}
      </>
  );
  
} */




