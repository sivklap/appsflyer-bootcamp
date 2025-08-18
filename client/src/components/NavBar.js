import React, {useState} from "react"
import "./NavBar.css"
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { authService } from '../api/authService';

import Tooltip from '@mui/material/Tooltip';


const NavBar = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        authService.logout(); // This will clear localStorage and update user state via callback
        setAnchorEl(null); // Close the menu
        navigate('/'); // Redirect to welcome page
    }

    const handleProfileClick = () => {
        handleClose();
        navigate(`/profile/${user.role}`);
    }

    const handleMentorsClick = () => {
        handleClose();
        navigate('/mentors');
    }

    const handleMentorHomeClick = () => {
        handleClose();
        navigate('/mentor-home');
    }

    // Debug: print user.img to console
    console.log('NavBar user.img:', user && user.img);
    return (
        <nav className="navbar">
            <Tooltip title="Home" placement="right">
                <a className="title" href={'/'} >
                    <img src="/images/logo.png" alt="Home Logo" className="logo" />
                </a>
            </Tooltip>

            <div className="navbar-user">
                { user ? (
                        <div className="navbar-logged-in">
                            <Tooltip title="Profile" placement="left">
                                <Avatar
                                    alt={user.first_name}
                                    src={
                                        user.img && typeof user.img === 'string' && (user.img.startsWith('data:') || user.img.startsWith('iVBOR'))
                                            ? (user.img.startsWith('data:') ? user.img : `data:image/png;base64,${user.img}`)
                                            : (user.img && (typeof user.img === 'string' || typeof user.img === 'number'))
                                                ? `/images/avatars/avatar-${user.img}.png`
                                                : '/images/avatars/avatar-1.png'
                                    }
                                    onClick={handleClick}
                                    className="user-avatar"
                                />
                            </Tooltip>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfileClick}>
                                    <span className="menu-link">Profile</span>
                                </MenuItem>

                                {/* Role-specific menu items */}
                                {user.role === 'mentee' ? (
                                    <MenuItem onClick={handleMentorsClick}>
                                        <span className="menu-link">See Mentors</span>
                                    </MenuItem>
                                ) : (
                                    <MenuItem onClick={handleMentorHomeClick}>
                                        <span className="menu-link">Mentor Home</span>
                                    </MenuItem>
                                )}

                                <MenuItem onClick={handleLogOut}>
                                    <span className="menu-link">Sign Out</span>
                                </MenuItem>
                            </Menu>
                        </div>

                ) : (
                    <div className="navbar-guest">
                        <Button
                            className="log-in"
                            variant="contained"
                            href="/login"
                        >
                            Log in
                        </Button>
                        <Button
                            className="sign-up"
                            variant="contained"
                            href="/signup"
                        >
                            Sign up
                        </Button>
                    </div>
                )}
            </div>



        </nav>
    )
}

export default NavBar;