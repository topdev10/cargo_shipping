import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Exit from '@material-ui/icons/ExitToApp';
import AccountBox from '@material-ui/icons/AccountBox';
import Dashboard from '@material-ui/icons/Dashboard';
import Assessment from '@material-ui/icons/Assessment';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Assignment from '@material-ui/icons/Assignment';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import Pusher from 'pusher-js';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { userActions, pageActions, alertActions } from '../actions';

import Config from '../config';

import logo from '../images/logo.svg';
import { pageConstants } from "../constants";

const SearchBox = styled.input`
    height: 42px;
    width: calc(100vw - 250px);
    margin-left: 15px;
    border-radius: 10px;
    border: 2px solid #78c2ec;
    padding: 5px 15px 5px 50px;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #252631;

    &:hover {
        border: 2px solid #7595bb;
    }
`;

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: fade('#32314c', 0.1),
        }
    },
});

const useStyles = makeStyles(mtheme => ({
    grow: {
        flexGrow: 1,
        backgroundImage: "radial-gradient(circle at 1% 1%, #f7f9fc, #eff2f6)"
    },
    menuButton: {
        marginRight: mtheme.spacing(2),
    },
    avatar_mobile:{
        width: 32,
        height: 32,
    },
    avatar_web:{
        width: 36,
        height: 36,
    },
    title: {
        display: 'none',
        margin: 'auto',
        marginLeft: "10px",
        color: "#515665",
        [mtheme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    mIconButton:{
        marginLeft: "10px",
        color: "#515665",
        borderRadius: "0px !important",
        '&:hover': {
            borderRadius: "0% !important",
        }
    },
    ma_dropdown: {
        color: "#515665",
        '&:hover': {
            color: "#000",
            borderRadius: "0% !important",
        }
    },
    inputInput: {
        padding: mtheme.spacing(1, 1, 1, 7),
        transition: mtheme.transitions.create('width'),
        width: '100%',
        [mtheme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [mtheme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    c_tab :{
        "font-family": "Poppins",
        "font-size": "16px",
        "font-weight": "600",
        "font-style": "normal",
        "font-stretch": "normal",
        "line-height": "normal",
        "letter-spacing": "0.5px",
        color: "#2b2c30",
    },
    sectionMobile: {
        display: 'flex',
        [mtheme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    notificationBox: {
        position: "absolute",
        right: "20px",
        top: "66px",
        width: "340px",
        zIndex: "99999",
        height: "72px",
        background: "#455169",
        color: "white",
        fontSize: "20px",
        fontFamily: "open",
        padding: "20px 10px",
        borderRadius: "10px",
        display: 'none',
        cursor: 'pointer',
        "-webkit-transition": "display 2s", /* For Safari 3.1 to 6.0 */
        "transition": "display 2s",
    },
    n_closeBTN: {
        position: "absolute",
        right: "10px",
        top: "0px",
        color: "red",
        fontSize: "20px",
        cursor: 'pointer',
        '&:hover': {
            color: "white",
        }
    }
}));

const Header = (props) => {

    // Pusher.logToConsole = true;
    /**
     * Implement Notification With Pusher
     */
    const pusher = new Pusher(Config.PUSHER_KEY, {
        cluster: Config.PUSHER_CLUSTER,
        forceTLS: true
    });

    const channel = pusher.subscribe(Config.PUSHER_CHANNEL);
    /**
     * Functional Component Main Body
     */
    const { username, email, logout, getProfile, loadPage, notification } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState('');
    const [onSearch, setSearchFlag] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Wait for New Notification
    channel.bind('notification', (data) => {
        notification(JSON.stringify(data));
    });

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
  
    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }
  
    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleLogout(){
        logout();
    }

    function viewProfile(){
        // history.push("/profile");
        getProfile(username, email);
        handleMenuClose();
    }

    function gotoHomepage(){
        // history.push('/pages/dashboard');
        loadPage(pageConstants.DASHBOARD);
    }
  
    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function onSearchChanged(event) {
        setSearchValue(event.target.value);
    }

    function onNavigate(e, type) {
        e.preventDefault();
        switch(type){
        case "DASHBOARD":
            loadPage(pageConstants.DASHBOARD);
            break;
        case "QUOTES":
            loadPage(pageConstants.QUOTES);
            break;
        case "SHIPMENTS":
            loadPage(pageConstants.SHIPMENTS);
            break;
        case "BILLING":
            loadPage(pageConstants.BILLING);
            break;
        case "REPORTS":
            loadPage(pageConstants.REPORTS);
            break;
        default:
            break;
        }
        handleMenuClose();
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={viewProfile}>
                <IconButton>
                    <AccountBox></AccountBox>
                </IconButton>
                Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton>
                    <Exit></Exit>
                </IconButton>
                Exit
            </MenuItem>
        </Menu>
    );
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Notifications
                </Typography>
            </MenuItem>
            <MenuItem onClick={e => onNavigate(e, "DASHBOARD")}>
                <IconButton color="inherit">
                    <Dashboard />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Dashboard
                </Typography>
            </MenuItem>
            <MenuItem onClick={e => onNavigate(e, "QUOTES")}>
                <IconButton color="inherit">
                    <Assignment />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Quotes
                </Typography>
            </MenuItem>
            <MenuItem onClick={e => onNavigate(e, "SHIPMENTS")}>
                <IconButton color="inherit">
                    <DirectionsBoat />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Shipments
                </Typography>
            </MenuItem>
            <MenuItem onClick={e => onNavigate(e, "BILLING")}>
                <IconButton color="inherit">
                    <MonetizationOn />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Billing
                </Typography>
            </MenuItem>
            <MenuItem onClick={e => onNavigate(e, "REPORTS")}>
                <IconButton color="inherit">
                    <Assessment />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Reports
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton color="inherit">
                    <AccountCircle className={classes.avatar_mobile} />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {username}
                </Typography>
            </MenuItem>
        </Menu>
    );
  
    return (
        <div className={classes.grow} >
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <img src={logo} style={{height: "45px", cursor: 'pointer'}} alt="logo" onMouseDownCapture={gotoHomepage}/>
                        {
                            onSearch&&<SearchBox type='text' value={searchValue} onChange={onSearchChanged} onBlur={() => setSearchFlag(false)} style={{opacity: 1}}/>
                        }
                        {
                            onSearch&&<IconButton style={{position: "fixed", left: "275px"}} aria-label="Search" onClick={() => setSearchFlag(false)}>
                                <SearchIcon />
                            </IconButton>
                        }
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {
                                !onSearch&&<IconButton  color='inherit' className={classes.mIconButton} onClick={() => setSearchFlag(true)}>
                                    <SearchIcon />
                                </IconButton>
                            }
                            <IconButton color='inherit' className={classes.mIconButton} onClick={gotoHomepage}>
                                <Dashboard />
                            </IconButton>
                            <IconButton color="inherit" className={classes.mIconButton}>
                                <Badge badgeContent={0} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                edge="end"
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                className={classes.mIconButton}
                                onClick={handleProfileMenuOpen}
                            >
                                <AccountCircle className={classes.avatar_web}/>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    {username}
                                </Typography>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            {renderMenu}
            {renderMobileMenu}
        </div>
    );
};

Header.propTypes = {
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        username: state.auth.user?state.auth.user.username:"newuser",
        email: state.auth.user?state.auth.user.email:"tmp@tmp.com"
    };
}

const actionCreators = {
    logout: userActions.logout,
    getProfile: pageActions.getProfile,
    loadPage: pageActions.loadPage,
    notification: alertActions.notification,
};

export default connect(mapStateToProps, actionCreators)(Header);