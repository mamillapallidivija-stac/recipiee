import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from './Icon.jsx';

function RecipeCard({ recipe, variant = '' }) {
  const { favorites, toggleFavorite } = useApp();
  const isSaved = favorites.includes(recipe.id);

  return (
    <article className={`recipe-card ${variant}`}>
      <div className="recipe-card__image-wrap">
        <Link to={`/recipes/${recipe.slug}`} className="recipe-card__image-link" aria-label={`View ${recipe.title}`}>
          <img className="recipe-card__image" src={recipe.image} alt={recipe.imageAlt} loading="lazy" />
        </Link>
        <span className="recipe-card__category">{recipe.category}</span>
        <button
          className={`icon-button recipe-card__save ${isSaved ? 'is-active' : ''}`}
          onClick={() => toggleFavorite(recipe.id)}
          type="button"
          aria-label={isSaved ? `Remove ${recipe.title} from saved recipes` : `Save ${recipe.title}`}
          aria-pressed={isSaved}
        >
          <Icon name="heart" size={19} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="recipe-card__body">
        <div className="recipe-card__meta"><span><Icon name="clock" size={15} />{recipe.time} min</span><span><Icon name="star" size={14} fill="currentColor" />{recipe.rating.toFixed(1)}</span></div>
        <Link to={`/recipes/${recipe.slug}`} className="recipe-card__title-link"><h3>{recipe.title}</h3></Link>
        <p>{recipe.subtitle}</p>
        <Link to={`/recipes/${recipe.slug}`} className="text-link">Get the recipe <Icon name="arrow" size={16} /></Link>
      </div>
    </article>
  );
}

export default memo(RecipeCard);
