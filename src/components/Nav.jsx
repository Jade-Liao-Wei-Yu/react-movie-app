import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav className="site-nav" aria-label="Main navigation">

            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/favourites"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Favourites
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        About
                    </NavLink>
                </li>
            </ul>

        </nav>
    );
}

export default Nav;