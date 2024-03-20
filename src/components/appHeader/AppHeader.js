import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
    // const location = useLocation();
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            activeStyle={{ color: "#9f0013" }}
                            isActive={(match, location) =>
                                match &&
                                !location.pathname.startsWith("/comics")
                            }
                            to="/"
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            activeStyle={{ color: "#9f0013" }}
                            to="/comics"
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
