import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const name = email.split('@')[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || 'Friend';
    setError('');
    signIn(name, email.trim().toLowerCase());
    navigate(location.state?.from || '/saved', { replace: true });
  }

  return <div className="auth-page container">
    <div className="auth-card">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="Fresh greens and colorful vegetables ready for the table" />
        <div className="auth-visual__overlay" />
        <div className="auth-visual__brand"><span className="brand__mark"><Icon name="chef" size={21} /></span><span className="brand__wordmark">recipe<span>studio</span></span></div>
        <div className="auth-visual__copy"><span className="eyebrow">A kitchen that feels like yours</span><h1>Keep the good<br />things <em>close.</em></h1><p>Save the recipes you love, and find your way back to them whenever the mood strikes.</p></div>
        <div className="auth-visual__quote"><span>“</span><p>Good food doesn’t need to be complicated.</p></div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-mobile-brand"><Link to="/" className="brand"><span className="brand__mark"><Icon name="chef" size={21} /></span><span className="brand__wordmark">recipe<span>studio</span></span></Link></div>
        <div className="auth-form-heading"><span className="eyebrow">Welcome back</span><h2>Come on in.</h2><p>Your next good meal is just around the corner.</p></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field"><label htmlFor="login-email">Email address</label><div className="form-input-wrap"><Icon name="user" size={18} /><input id="login-email" type="email" name="email" autoComplete="email" autoFocus required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div></div>
          <div className="form-field"><label htmlFor="login-password">Password</label><div className="form-input-wrap"><Icon name="chef" size={18} /><input id="login-password" type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" minLength="6" required placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
          <button className="button button--primary button--full auth-submit" type="submit">Sign in <Icon name="arrow" size={17} /></button>
        </form>
        <div className="demo-box"><div><Icon name="sparkle" size={17} /><span><strong>Just having a look?</strong><small>Use a ready-made demo account.</small></span></div><button className="demo-box__button" type="button" onClick={() => { setEmail('hello@recipe.studio'); setPassword('cooktogether'); setError(''); }}>Fill demo login</button></div>
        <p className="auth-switch">New around here? <Link to="/signup">Make a little account</Link></p>
        <p className="auth-disclaimer">This is a front-end demo. Sign-in details are stored only in this browser and do not create a secure online account.</p>
      </div>
    </div>
  </div>;
}
