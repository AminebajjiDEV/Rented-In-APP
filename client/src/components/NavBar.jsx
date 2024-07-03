import { IconButton } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import "../partials/navbar.scss"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setLogout } from "../redux/state";

const NavBar = () => {
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    return (
        
            <div className="navbar">
                <a href="/">
                    <img src="/assets/logo.png" alt='logo' />
                </a>
                <div className="navbar_search">
                    <input type="text" placeholder='Search...' />
                    <IconButton>
                        <Search className="navbar_search_svg"></Search>
                    </IconButton>
                </div>

                <div className="navbar_right">
                    {user ? (<a href="/create-listing" className="host">Become A Host</a>
                    ) : (
                        <a href="/login" className="host" >Become A Host</a>)}
                    <button className="navbar_right_account" onClick={() => setDropDownMenu(!dropDownMenu)}>
                        <Menu />
                        {!user ?
                            (<Person />
                            ) : ( // to replace the Person icon with the users own profile picture
                                <img
                                    src={`http://localhost:3001/${user.profilePicturePath.replace("public", "")}`}
                                    alt=""
                                    style={{ objectFit: "cover", borderRadius: "50%" }}
                                />
                            )
                        }
                    </button>
                    {dropDownMenu && !user && (
                        <div className="navbar_right_dropdownmenu">
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Sign Up</Link>
                        </div>
                    )}
                    {dropDownMenu && user && (
                        <div className="navbar_right_dropdownmenu">
                            <Link to="/:userId/trips">Your Bookings</Link>
                            <Link to="">Wish List</Link>
                            <Link to="">Property List</Link>
                            <Link to="">Reservation List</Link>
                            <Link to="/create-listing">Become A Host</Link>

                            <Link to="/" onClick={() => {
                                dispatch(setLogout())
                            }}>Log Out</Link>
                        </div>
                    )}
                </div>
            </div>


    )
}

export default NavBar