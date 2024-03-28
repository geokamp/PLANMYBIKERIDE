import * as React from 'react';
import  {useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './logo.png';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';


const pages = ['HOME', 'MAP', 'HELP'];
const settings = ['Profile', 'MyRoutes'];


function Header() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  

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


  

  return (
    <AppBar position="static" style ={{backgroundColor:'#3f448e', alignItems:"center"}}>
    
      <Container maxWidth="xl">
        <Toolbar disableGutters >
         
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
            <Link to='/'>
              <img src={logo} alt='logo' style={{width:"50px", height:"50px"}}></img>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems:"center" }}>
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
              {currentUser ? (
                  // If currentUser exists, render all pages
                  pages.map((page, index) => (
                    <Link key={index} to={`/${page}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button>{page}</Button>
                    </Link>
                  ))
                ) : (
                  // If currentUser doesn't exist, render only page[0] and page[2]
                  [0, 2].map((index) => (
                    <Link key={index} to={`/${pages[index]}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button>{pages[index]}</Button>
                    </Link>
                  ))
                )}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="b"
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
            <Link to='/HOME' >
              <img src={logo} alt='logo' style={{width:"50px", height:"50px"}}></img>
            </Link>
          </Typography>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, textAlign:"center" } }>
            {currentUser ? (
             // If currentUser exists, render all pages
                  pages.map((page, index) => (
                    <Link key={index} to={`/${page}`} style={{ textDecoration: 'none' }}>
                      <Button sx={{ color: '#ffffff' }}>{page}</Button>
                    </Link>
                  ))
                ) : (
                  // If currentUser doesn't exist, render only page[0] and page[2]
                  [0, 2].map((index) => (
                    <Link key={index} to={`/${pages[index]}`} style={{ textDecoration: 'none'}}>
                      <Button sx={{ color: '#ffffff' }}>{pages[index]}</Button>
                    </Link>
                  ))
                )}
          </Box>
          {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={currentUser.avatar} />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link to={`/${setting}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button >{setting}</Button> 
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Link to='/SignIn' style={{ textDecoration: 'none', color: 'inherit' }} >  
                  <Button color="inherit">Login</Button>
              </Link>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;