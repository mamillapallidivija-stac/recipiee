import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlanPage() {
  const { mealPlan, setMealPlan, addToShoppingList, recipes } = useApp();
  const plannedRecipes = useMemo(() => days.map((day) => recipes.find((recipe) => recipe.id === mealPlan[day])).filter(Boolean), [mealPlan]);
  const ingredientItems = plannedRecipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ({ name: `${ingredient.amount} ${ingredient.unit ? `${ingredient.unit} ` : ''}${ingredient.name}`.trim() })));

  function setDay(day, value) {
    setMealPlan((current) => ({ ...current, [day]: value }));
  }

  return <div className="collection-page container meal-plan-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Meal planner</span></div>
    <div className="plan-hero"><div><span className="eyebrow"><Icon name="calendar" size={16} /> A calmer week starts here</span><h1>A week that<br /><em>takes care of you.</em></h1><p>Choose a recipe for any day. No grand plan needed—one good dinner is already a start.</p></div><div className="plan-hero__note"><Icon name="sparkle" size={22} /><strong>A little is plenty.</strong><span>Pick just one or two days to begin.</span></div></div>
    <div className="plan-grid">{days.map((day, index) => {
      const recipe = recipes.find((item) => item.id === mealPlan[day]);
      return <div className={`plan-day ${recipe ? 'has-recipe' : ''}`} key={day}>
        <div className="plan-day__label"><span>{day}</span><small>{['Start easy', 'A fresh idea', 'Midweek meal', 'Something cozy', 'End on a high', 'Take your time', 'Keep it simple'][index]}</small></div>
        {recipe ? <div className="plan-day__recipe"><img src={recipe.image} alt="" loading="lazy" /><div><Link to={`/recipes/${recipe.slug}`}><strong>{recipe.title}</strong></Link><small><Icon name="clock" size={14} />{recipe.time} min</small></div><button type="button" className="icon-button plan-day__remove" aria-label={`Remove ${recipe.title} from ${day}`} onClick={() => setDay(day, '')}><Icon name="close" size={16} /></button></div> : <label className="plan-select-wrap"><span className="sr-only">Choose a recipe for {day}</span><select value={mealPlan[day] || ''} onChange={(event) => setDay(day, event.target.value)}><option value="">Choose a recipe…</option>{recipes.filter((item) => item.category === 'Dinner').map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select><Icon name="plus" size={17} /></label>}
      </div>;
    })}</div>
    <div className="plan-footer"><div><strong>{plannedRecipes.length} {plannedRecipes.length === 1 ? 'meal' : 'meals'} on your plan</strong><span>Your plan is saved on this device.</span></div><button className="button button--primary" type="button" onClick={() => addToShoppingList(ingredientItems)} disabled={!ingredientItems.length}><Icon name="bag" size={17} /> Add planned ingredients</button></div>
  </div>;
}
