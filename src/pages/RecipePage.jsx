import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRecipe } from '../data/recipes.js';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { allergenLabels, alternativesFor } from '../data/allergies.js';

const fractionGlyphs = new Map([[0.25, '¼'], [0.5, '½'], [0.75, '¾'], [1 / 3, '⅓'], [2 / 3, '⅔']]);

function formatAmount(value) {
  const rounded = Math.round(value * 100) / 100;
  const whole = Math.floor(rounded);
  const part = rounded - whole;
  const match = [...fractionGlyphs].find(([fraction]) => Math.abs(fraction - part) < 0.025);
  if (match) return `${whole || ''}${match[1]}`;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, '');
}

export default function RecipePage() {
  const { slug } = useParams();
  const { favorites, toggleFavorite, addToShoppingList, recipes, allergyPreferences } = useApp();
  const recipe = getRecipe(slug, recipes);
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [activeStep, setActiveStep] = useState(-1);
  const [ingredientSwaps, setIngredientSwaps] = useState({});

  useEffect(() => {
    setServings(recipe?.servings || 2);
    setCheckedIngredients([]);
    setActiveStep(-1);
    setIngredientSwaps({});
  }, [recipe?.id]);

  const related = useMemo(() => recipes.filter((item) => item.id !== recipe?.id && item.category === recipe?.category).slice(0, 2), [recipe, recipes]);
  if (!recipe) return <div className="container not-found-inline"><span className="eyebrow">This page went missing</span><h1>We couldn’t find that recipe.</h1><Link className="button button--primary" to="/recipes">Browse all recipes <Icon name="arrow" size={17} /></Link></div>;

  const isSaved = favorites.includes(recipe.id);
  const recipeAllergens = recipe.allergens || [];
  const allergyConflicts = recipeAllergens.filter((item) => allergyPreferences.includes(item));
  const toggleIngredient = (index) => setCheckedIngredients((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  const scaledIngredients = recipe.ingredients.map((ingredient, index) => `${formatAmount(ingredient.amount * servings / recipe.servings)} ${ingredient.unit ? `${ingredient.unit} ` : ''}${ingredientSwaps[index] || ingredient.name}`.trim());

  return <article className="recipe-page container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/recipes">Recipes</Link><span>/</span><span>{recipe.title}</span></div>
    <div className="recipe-hero">
      <div className="recipe-hero__copy">
        <span className="eyebrow"><span className="eyebrow__dot" /> {recipe.category} · {recipe.difficulty}</span>
        <h1>{recipe.title.split(' ').slice(0, -1).join(' ')} <em>{recipe.title.split(' ').slice(-1)}</em></h1>
        <p className="recipe-hero__subtitle">{recipe.subtitle}</p>
        <p className="recipe-hero__description">{recipe.description}</p>
        <div className="recipe-rating"><span className="recipe-rating__stars" aria-label={`${recipe.rating} out of 5 stars`}>★★★★★</span><strong>{recipe.rating.toFixed(1)}</strong><span>({recipe.reviews} home cooks)</span></div>
        <div className="recipe-quick-facts"><div><Icon name="clock" /><span><strong>{recipe.time} min</strong><small>Total time</small></span></div><div><Icon name="chef" /><span><strong>{recipe.difficulty}</strong><small>Effort</small></span></div><div><Icon name="leaf" /><span><strong>{recipe.calories} kcal</strong><small>Per serving</small></span></div></div>
        <div className="recipe-hero__actions">
          <button className={`button ${isSaved ? 'button--saved' : 'button--primary'}`} onClick={() => toggleFavorite(recipe.id)} type="button" aria-pressed={isSaved}><Icon name="heart" size={18} fill={isSaved ? 'currentColor' : 'none'} />{isSaved ? 'Saved to favorites' : 'Save recipe'}</button>
          <button className="button button--outline" type="button" onClick={() => window.print()}><Icon name="print" size={17} /> Print recipe</button>
        </div>
      </div>
      <div className="recipe-hero__image-wrap"><img className="recipe-hero__image" src={recipe.image} alt={recipe.imageAlt} /><span className="recipe-image-credit">Photo <a href={recipe.imageCredit} target="_blank" rel="noreferrer">Unsplash</a></span></div>
    </div>

    <div className={`allergy-callout ${allergyConflicts.length ? 'allergy-callout--warning' : ''}`} role="note">
      <Icon name="sparkle" size={19} />
      <p><strong>{allergyConflicts.length ? 'Matches an allergy you saved.' : 'Allergen information'}</strong> Recipe ingredients are tagged for {recipeAllergens.length ? allergenLabels(recipeAllergens).join(', ') : 'no major allergens in the listed ingredients'}. Check every package label and guard against kitchen cross-contact; swaps here are suggestions, not a safety guarantee.</p>
    </div>

    <div className="recipe-content-grid">
      <aside className="ingredients-panel">
        <div className="ingredients-panel__heading"><div><span className="eyebrow">What you’ll need</span><h2>Ingredients</h2></div><span className="ingredients-count">{recipe.ingredients.length} items</span></div>
        <div className="servings-control"><span>Serves</span><div><button type="button" onClick={() => setServings((value) => Math.max(1, value - 1))} aria-label="Decrease servings"><Icon name="minus" size={16} /></button><strong aria-live="polite">{servings}</strong><button type="button" onClick={() => setServings((value) => Math.min(16, value + 1))} aria-label="Increase servings"><Icon name="plus" size={16} /></button></div></div>
        <ul className="ingredient-list">{recipe.ingredients.map((ingredient, index) => { const options = alternativesFor(ingredient); return <li key={`${ingredient.name}-${index}`} className={checkedIngredients.includes(index) ? 'is-checked' : ''}><label><input type="checkbox" checked={checkedIngredients.includes(index)} onChange={() => toggleIngredient(index)} /><span className="custom-check"><Icon name="check" size={13} /></span><span>{formatAmount(ingredient.amount * servings / recipe.servings)} {ingredient.unit && `${ingredient.unit} `}{ingredientSwaps[index] || ingredient.name}</span></label>{options.length > 0 && <select className="ingredient-swap" aria-label={`Alternative for ${ingredient.name}`} value={ingredientSwaps[index] || ''} onChange={(event) => setIngredientSwaps((current) => ({ ...current, [index]: event.target.value }))}><option value="">Swap</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>}</li>; })}</ul>
        <button className="button button--outline button--full" type="button" onClick={() => addToShoppingList(scaledIngredients.map((name) => ({ name })))}><Icon name="bag" size={17} /> Add ingredients to list</button>
        <div className="ingredient-tip"><Icon name="sparkle" size={17} /><p>Tick off each ingredient as you prep. Your list stays saved on this device.</p></div>
      </aside>
      <section className="method-panel" aria-labelledby="method-heading">
        <div className="method-panel__heading"><div><span className="eyebrow">Let’s get cooking</span><h2 id="method-heading">The method</h2></div><button className="text-link cook-mode" type="button" onClick={() => { setActiveStep((step) => step === -1 ? 0 : -1); document.getElementById('method-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Icon name="chef" size={17} />{activeStep === -1 ? 'Start cooking' : 'Exit cook mode'}</button></div>
        <ol className="method-list">{recipe.steps.map((step, index) => <li key={step} className={`${activeStep === index ? 'is-active' : ''} ${activeStep > index ? 'is-complete' : ''}`}>
          <button className="method-step-number" type="button" onClick={() => setActiveStep((current) => current === index ? -1 : index)} aria-label={`Mark step ${index + 1} ${activeStep === index ? 'complete' : 'current'}`}><span>{activeStep > index ? <Icon name="check" size={17} /> : String(index + 1).padStart(2, '0')}</span></button>
          <div className="method-step-copy"><p>{step}</p>{activeStep === index && <button type="button" className="method-next" onClick={() => setActiveStep(index + 1 < recipe.steps.length ? index + 1 : -1)}>{index + 1 < recipe.steps.length ? <>Next step <Icon name="arrow" size={15} /></> : <>Finish cooking <Icon name="check" size={15} /></>}</button>}</div>
        </li>)}</ol>
        <div className="recipe-source"><span className="recipe-source__mark">r.</span><div><strong>A good recipe, from a good source</strong><p>Recipe details are adapted from BBC Good Food. Follow the original for extra tips and variations.</p></div><a href={recipe.source} target="_blank" rel="noreferrer" className="text-link">View source <Icon name="arrow" size={15} /></a></div>
      </section>
    </div>
    {related.length > 0 && <section className="section recipe-related"><div className="section-heading"><div><span className="eyebrow">A little more inspiration</span><h2>More to love</h2></div><Link to="/recipes" className="text-link">Explore every recipe <Icon name="arrow" size={15} /></Link></div><div className="recipe-grid recipe-grid--three">{related.map((item) => <RecipeCard key={item.id} recipe={item} />)}</div></section>}
  </article>;
}
