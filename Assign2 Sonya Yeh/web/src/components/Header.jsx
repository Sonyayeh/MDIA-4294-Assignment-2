import h from './Header.module.css';
import g from '../global.module.css';
import logo from '../assets/images/logo.svg';

function Header() {
    return (
        <header className={h['header']}>
            <div className={ `${g['container']} ${h['main-nav']}`}> 
                <img src={logo} width={100} alt="Lofi Tapes" />
                <p>lofi beats to code<span>/</span>design<span>/</span>study to<span>.</span></p>
            </div>
        </header>
    )
}

export default Header;