/* eslint-disable jsx-a11y/anchor-is-valid */
import "./appHeader.scss";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a tabIndex={1} href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <a tabIndex={1} href="#">
                            Characters
                        </a>
                    </li>
                    /
                    <li>
                        <a tabIndex={1} href="#">
                            Comics
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
