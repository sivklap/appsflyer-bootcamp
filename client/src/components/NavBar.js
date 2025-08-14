import React, {useState} from "react"
import "./NavBar.css"
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const NavBar = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <nav className="navbar">
            <a className="title" href={'/'}>
                <img src="/images/logo.png" alt="Home Logo" className="logo" />
            </a>
            <div className="navbar-user">
                { user ? (
                        <div className="navbar-logged-in">
                            <Avatar
                                alt={user.first_name}
                                src={`/images/avatars/avatar-${user.img}.png`}
                                onClick={handleClick}
                                className="user-avatar"
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <a href={`/profile/${user.role}`} className="menu-link">Profile</a>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <a href="/" className="menu-link">Sign Out</a>
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