import React from "react"
import "./NavBar.css"
import Button from '@mui/material/Button';


const NavBar = ({user}) => {
    return (
        <nav className="navbar">
            <a className="title" href={'/'}>
                <h3>Home</h3>
            </a>
            <div className="navbar-user">
                { user ? (

                    <div className="user-bye">
                        <Button
                            className="log-out"
                            variant="contained"
                            href="/"
                        >
                            Log out
                        </Button>
                    </div>

                ) : (
                    <div className="user-hi">
                        <Button
                            className="log-in"
                            variant="contained"
                            href="/"
                        >
                            Log in
                        </Button>
                        <Button
                            className="sign-up"
                            variant="contained"
                            href="/"
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