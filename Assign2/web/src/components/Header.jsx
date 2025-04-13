import { Link } from "react-router-dom";
import h from './Header.module.css';
import g from '../global.module.css';
import logo from '../assets/images/logo.svg';

function Header({ handleLogout, isAuthenticated }) {
    return (
        <header className={h['header']}>
            <div className={`${g['container']} ${h['main-nav']}`}>
                <Link to="/">
                    <img src={logo} width={100} alt="Lofi Tapes" />
                </Link>

                <div className={h["nav-actions"]}>
                    {/* Display tagline instead of "All Mangas" link */}
                    <span className={h["header-tagline"]}>
                        Totally LEGAL & Free Manga 👀
                    </span>

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className={`${g["button"]} ${g["warning"]}`}
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link className={g["button"]} to="/sign-in">
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
