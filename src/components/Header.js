import AccountCircle          from "@mui/icons-material/AccountCircle";
import EmojiFoodBeverageIcon  from '@mui/icons-material/EmojiFoodBeverage';
import MailIcon               from "@mui/icons-material/Mail";
import NotificationsIcon      from "@mui/icons-material/Notifications";
import SearchIcon             from "@mui/icons-material/Search";
import { Button }             from "@mui/material";
import AppBar                 from "@mui/material/AppBar";
import Avatar                 from '@mui/material/Avatar';
import Badge                  from "@mui/material/Badge";
import Box                    from "@mui/material/Box";
import CardHeader             from '@mui/material/CardHeader';
import { red }                from '@mui/material/colors';
import IconButton             from "@mui/material/IconButton";
import Menu                   from "@mui/material/Menu";
import MenuItem               from "@mui/material/MenuItem";
import { alpha, styled }      from "@mui/material/styles";
import Toolbar                from "@mui/material/Toolbar";
import Typography             from "@mui/material/Typography";
import * as React             from "react";
import { Link }               from 'react-router-dom';
import history                from '../data/history';
import UsersSearch            from './UsersSearch';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


export default function Header({userNick, userId,userData, requiredNicknames,Logout, onChooseNick}) {
  // console.log('userData',userData,userNick, userId)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <Link style={{textDecoration: "none", color: "black"}} to={`/profile`}>
        Profile
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
    
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <span>Messages</span>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <span>Notifications</span>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <span></span>
      </MenuItem>
    </Menu>
  );

  // const [activeLink, SetLink] = useState(false)
  
  // const link = history.location.pathname === `/profile/${userId}`? '' : `profile/${userId}` 
  const link = `profile/${userId}` 
  // console.log(history.location.pathname === `/profile/${userId}`, link)
  return (
    <Box style={{zIndex: 3}} sx={{ flexGrow: 1, position: "fixed", width:"100%"}}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor: '#b22020'}}>
          <Link style={{flexGrow: 0.1, textDecoration: "none", color: "white"}} to={`/content`}>
            <EmojiFoodBeverageIcon/>
            <EmojiFoodBeverageIcon/>
            <EmojiFoodBeverageIcon/>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Hipstagram
            </Typography>
          </Link>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <UsersSearch  requiredNicknames={requiredNicknames} onChooseNick={onChooseNick}/>
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box >
            <Link style={{textDecoration: "none", display: "flex", alignItems:"center",color: "white"}} to={`/profile/${userId}`}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {userNick}
              </Typography>

              { 
                userNick
                ? <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500],width: 50, height: 50, }} alt='' aria-label="recipe" src={!!userData ? `http://hipstagram.node.ed.asmer.org.ua/${userData?.avatar?.url}`:''}/>
                }/> 
                : <AccountCircle style={{width: "50px", height: "50px"}}/>} 
            </Link>
          </Box>
          
          {localStorage.authToken
          ?<Button 
            sx={{backgroundColor: 'red'}} 
            variant="contained"
            onClick={() => {Logout()}}
            >
              Get out!
          </Button>:''}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
