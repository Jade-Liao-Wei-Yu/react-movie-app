import { Link } from "react-router-dom";
import Nav from "./Nav";

function Header() {
    return (
        <header className="site-header">

            <Link to="/" className="site-title">
                Movie App
            </Link>

            <Nav />

        </header>
    );
}

export default Header;