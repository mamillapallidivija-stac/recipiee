import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Icon from '../components/Icon.jsx';

export default function SavedPage() {
  const { favorites, recipes } = useApp();
  const savedRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
  return <div className="collection-page container saved-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Saved recipes</span></div>
    <div className="simple-page-heading"><span className="eyebrow"><Icon name="heart" size={16} /> A collection of your own</span><h1>Your saved <em>recipes.</em></h1><p>All your little “let’s make that again” moments, together in one place.</p></div>
    {savedRecipes.length ? <><div className="collection-results"><div><h2>Keepers</h2><p>{savedRecipes.length} recipes saved for later</p></div><Link to="/recipes" className="text-link">Find more to love <Icon name="arrow" size={16} /></Link></div><div className="recipe-grid recipe-grid--three">{savedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div></> : <div className="empty-state"><div className="empty-state__icon"><Icon name="heart" size={26} /></div><span className="eyebrow">A fresh little start</span><h2>Your next favorite is out there.</h2><p>Tap the heart on any recipe to tuck it away for another day.</p><Link to="/recipes" className="button button--primary">Explore the recipes <Icon name="arrow" size={17} /></Link></div>}
  </div>;
}
