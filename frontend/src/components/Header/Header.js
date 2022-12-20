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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from "../../store/authSlice"

import "./header.css"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: -2,
    border: `2px solid #FFF`,
    padding: '0 5px',
    backgroundColor: "RGB(1, 61, 41)"
  },
}));



const pages = ['Home', 'Products', 'AboutUs'];


function ResponsiveAppBar() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {userData,isLoggedIn} = useSelector((state)=> state.auth)
  const totalproductscart = useSelector((state) => state.cart.totalproductscart);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const onLogout = () => {
    setTimeout(() => {
      dispatch(logout());
      navigate("/login")
    },500);
    
  };

  return (   
    <AppBar position="static">
      <Container maxWidth="xl">
         {/* <Navbar /> */}
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <NavLink to="/home">
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shopcart
          </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {isLoggedIn && (
               <Menu
               id="menu-appbar"
               anchorEl={anchorElNav}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'left',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'left',
               }}
               open={Boolean(anchorElNav)}
               onClose={handleCloseNavMenu}
               sx={{
                 display: { xs: 'block', md: 'none' },
               }}
             >
               {pages.map((page) => (
                 <MenuItem key={page} onClick={handleCloseNavMenu}>
                   <Typography textAlign="center">{page}</Typography>
                 </MenuItem>
               ))}
             </Menu>
            )}
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            NavLink="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shopcart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , justifyContent: 'center' }}}>
                {pages.map((page) => (
                  <Button 
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 <NavLink to={`/${page}/`}  className={({ isActive }) =>
                 isActive ? "activelink" : "" }>
                     {page}
                 </NavLink>
                 </Button>
               ))}
          </Box>
          {
           isLoggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0 }}>
                <img src={`http://localhost:8000/${userData?.profilePic}`} width="40px" height="40px" alt="userimage" />
                <span className='username'>{userData?.username}</span>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <NavLink to="/profile">
                  <Typography textAlign="center">profile</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem   onClick={onLogout} >
                  <NavLink to="/logout">
                  <Typography textAlign="center">logout</Typography>
                  </NavLink>
              </MenuItem>
            </Menu>
          </Box>
            )
          }

          {
            !isLoggedIn && (
              <>
                 <div>
                  <NavLink to="/login">Login</NavLink>
                </div>
                <div>
                  <NavLink to="/register">Register</NavLink>
                </div>
              </>
            )
          }
          <IconButton aria-label="cart"  sx={{fontSize:"26px", ml:3}}>
            <NavLink to="/cart">
              <StyledBadge badgeContent={totalproductscart || "0"} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </NavLink>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;





