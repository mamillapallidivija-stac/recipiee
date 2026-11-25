import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from './Icon.jsx';

function Brand({ onClick }) {
  return <Link to="/" className="brand" aria-label="Recipe Studio home" onClick={onClick}>
    <span className="brand__mark"><Icon name="chef" size={21} /></span>
    <span className="brand__wordmark">recipe<span>studio</span></span>
  </Link>;
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites, shoppingList, user, notice, signOut } = useApp();
  const closeMenu = () => setMenuOpen(false);

  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <div className="announcement"><Icon name="sparkle" size={15} /> A little more joy at the dinner table <span>·</span> Find your next favorite</div>
    <header className="site-header">
      <div className="site-header__inner">
        <Brand onClick={closeMenu} />
        <button className="icon-button nav-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} type="button"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/recipes" onClick={closeMenu}>Recipes</NavLink>
          <NavLink to="/chef" onClick={closeMenu}>Chef Studio</NavLink>
          <NavLink to="/meal-plan" onClick={closeMenu}>Meal planner</NavLink>
          <NavLink to="/shopping-list" onClick={closeMenu}>Shopping list{shoppingList.length > 0 && <span className="nav-count">{shoppingList.length}</span>}</NavLink>
        </nav>
        <div className="site-header__actions">
          <Link className="header-icon-link" to="/saved" aria-label={`Saved recipes${favorites.length ? `, ${favorites.length}` : ''}`}><Icon name="heart" /><span className="header-icon-link__label">Saved</span>{favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}</Link>
          {user ? <div className="header-user"><span className="header-user__avatar">{user.name.slice(0, 1).toUpperCase()}</span><span className="header-user__name">{user.name.split(' ')[0]}</span><button className="header-signout" onClick={signOut} type="button">Sign out</button></div> : <Link to="/login" className="button button--nav"><Icon name="user" size={16} /> Sign in</Link>}
        </div>
      </div>
    </header>
    <main id="main-content"><Outlet /></main>
    <footer className="site-footer">
      <div className="footer__top">
        <div className="footer__brand"><Brand /><p>Good food. A softer pace.<br />A kitchen that feels like yours.</p></div>
        <div className="footer__links"><span>Find your next favorite</span><Link to="/recipes">Explore recipes</Link><Link to="/meal-plan">Plan your week</Link><Link to="/saved">Your saved recipes</Link></div>
        <div className="footer__note"><span>Made for real life</span><p>Clear steps, thoughtful ingredients and a little inspiration for whatever is already in your kitchen.</p><Link to="/recipes" className="text-link">Let’s cook <Icon name="arrow" size={15} /></Link></div>
      </div>
      <div className="footer__bottom"><span>© 2026 Recipe Studio</span><span>Made with a little extra butter <span aria-hidden="true">♥</span></span></div>
    </footer>
    {notice && <div className="toast" role="status"><Icon name="check" size={18} />{notice}</div>}
  </>;
}
