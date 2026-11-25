import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

export default function NotFoundPage() {
  return <div className="not-found-page container"><div className="empty-state__icon"><Icon name="chef" size={28} /></div><span className="eyebrow">A little kitchen detour</span><h1>There’s nothing<br /><em>cooking here.</em></h1><p>That page seems to have wandered off. Let’s find you something lovely instead.</p><Link to="/recipes" className="button button--primary">Browse all recipes <Icon name="arrow" size={17} /></Link></div>;
}
