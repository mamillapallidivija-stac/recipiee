import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cook');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { createAccount } = useApp();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (role === 'admin' && adminCode.trim() !== 'CHEF2026') {
      setError('That Chef Admin code is not correct.');
      return;
    }
    createAccount(name.trim(), email.trim().toLowerCase(), role);
    navigate('/saved', { replace: true });
  }

  return <div className="auth-page container auth-page--signup">
    <div className="auth-card auth-card--signup">
      <div className="auth-visual auth-visual--signup">
        <img src="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1100&q=85" alt="A bright, inviting breakfast shared at the table" />
        <div className="auth-visual__overlay" />
        <div className="auth-visual__brand"><span className="brand__mark"><Icon name="chef" size={21} /></span><span className="brand__wordmark">recipe<span>studio</span></span></div>
        <div className="auth-visual__copy"><span className="eyebrow">A new favorite is waiting</span><h1>Make a little<br /><em>room for joy.</em></h1><p>Start your own collection of recipes, plans and lovely meals worth remembering.</p></div>
        <div className="auth-visual__quote"><span>✳</span><p>One good recipe can change the whole evening.</p></div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-mobile-brand"><Link to="/" className="brand"><span className="brand__mark"><Icon name="chef" size={21} /></span><span className="brand__wordmark">recipe<span>studio</span></span></Link></div>
        <div className="auth-form-heading"><span className="eyebrow">Make it yours</span><h2>A seat at the table.</h2><p>A few details and your recipe book is ready.</p></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field"><label htmlFor="signup-name">Your name</label><div className="form-input-wrap"><Icon name="user" size={18} /><input id="signup-name" type="text" autoComplete="name" autoFocus required minLength="2" maxLength="48" placeholder="What should we call you?" value={name} onChange={(event) => setName(event.target.value)} /></div></div>
          <div className="form-field"><label htmlFor="signup-email">Email address</label><div className="form-input-wrap"><Icon name="user" size={18} /><input id="signup-email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div></div>
          <div className="form-field"><label htmlFor="signup-password">Choose a password</label><div className="form-input-wrap"><Icon name="chef" size={18} /><input id="signup-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength="8" pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,}" title="Use at least 8 characters, including a letter and a number." placeholder="8 characters, with a number" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div><small className="form-hint">At least 8 characters, including a number.</small></div>
          <div className="form-field"><label htmlFor="signup-role">Account type</label><select id="signup-role" className="chef-text-input" value={role} onChange={(event) => { setRole(event.target.value); setError(''); }}><option value="cook">Home cook</option><option value="admin">Chef Admin — can add and edit recipes</option></select></div>
          {role === 'admin' && <div className="form-field"><label htmlFor="signup-admin-code">Chef Admin access code</label><input id="signup-admin-code" className="chef-text-input" type="password" value={adminCode} onChange={(event) => setAdminCode(event.target.value)} required placeholder="Enter the admin code" /><small className="form-hint">Demo code: CHEF2026</small></div>}
          <button className="button button--primary button--full auth-submit" type="submit">Create my account <Icon name="arrow" size={17} /></button>
        </form>
        <p className="auth-switch">Already have a little account? <Link to="/login">Sign in</Link></p>
        <p className="auth-disclaimer">This is a front-end demo. Details are stored only in this browser and do not create a secure online account.</p>
      </div>
    </div>
  </div>;
}
