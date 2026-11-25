import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import { allergens } from '../data/allergies.js';

const blankForm = {
  title: '', category: 'Dinner', description: '', time: 30, servings: 2, image: '', source: '',
  ingredientText: '1 | tbsp | olive oil | avocado oil\n2 |  | garlic cloves, chopped | garlic-infused oil',
  stepsText: 'Prepare and measure the ingredients.\nCook until tender and serve warm.',
  allergens: [],
};

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function ingredientLinesToText(ingredients = []) {
  return ingredients.map((item) => [item.amount, item.unit || '', item.name, (item.alternatives || []).join(', ')].join(' | ')).join('\n');
}

function parseIngredients(value) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const [amountText, unit = '', name = '', alternativeText = ''] = line.split('|').map((part) => part.trim());
    return {
      amount: Math.max(0, Number(amountText) || 1),
      unit,
      name: name || amountText,
      alternatives: alternativeText.split(',').map((item) => item.trim()).filter(Boolean),
    };
  });
}

export default function ChefPage() {
  const { recipes, saveRecipe, removeRecipe, allergyPreferences, setAllergyPreferences, user } = useApp();
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const filteredRecipes = useMemo(() => recipes.filter((recipe) => `${recipe.title} ${recipe.category}`.toLowerCase().includes(search.toLowerCase())), [recipes, search]);

  function changeField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleAllergen(id) {
    setForm((current) => ({ ...current, allergens: current.allergens.includes(id) ? current.allergens.filter((item) => item !== id) : [...current.allergens, id] }));
  }

  function togglePreference(id) {
    setAllergyPreferences((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function editRecipe(recipe) {
    setEditingId(recipe.id);
    setForm({
      ...blankForm,
      title: recipe.title,
      category: recipe.category,
      description: recipe.description,
      time: recipe.time,
      servings: recipe.servings,
      image: recipe.image,
      source: recipe.source || '',
      ingredientText: ingredientLinesToText(recipe.ingredients),
      stepsText: recipe.steps.join('\n'),
      allergens: recipe.allergens || [],
    });
    document.getElementById('chef-recipe-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetForm() {
    setForm(blankForm);
    setEditingId('');
    setMessage('');
  }

  function submitRecipe(event) {
    event.preventDefault();
    const ingredients = parseIngredients(form.ingredientText);
    const steps = form.stepsText.split('\n').map((step) => step.trim()).filter(Boolean);
    if (ingredients.length === 0 || steps.length === 0) {
      setMessage('Add at least one ingredient and one cooking step.');
      return;
    }
    const id = editingId || `custom-${Date.now()}`;
    const slug = editingId ? recipes.find((recipe) => recipe.id === editingId)?.slug || slugify(form.title) : `${slugify(form.title)}-${Date.now().toString().slice(-4)}`;
    const image = form.image.trim() || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85';
    saveRecipe({
      id, slug, title: form.title.trim(), subtitle: 'A recipe from your Chef Studio',
      description: form.description.trim(), category: form.category,
      tags: [form.category, 'Chef added'], time: Math.max(1, Number(form.time) || 30),
      prep: Math.max(1, Number(form.time) || 30), cook: 0,
      servings: Math.max(1, Number(form.servings) || 2), difficulty: 'Easy', rating: 5,
      reviews: 0, calories: 0, image,
      imageAlt: `A dish for ${form.title.trim()}`,
      imageCredit: form.image.trim() || 'https://unsplash.com/',
      source: form.source.trim() || '#',
      ingredients,
      steps,
      allergens: form.allergens,
    });
    setMessage(editingId ? 'Your recipe changes are saved.' : 'Your new recipe is ready in the recipe collection.');
    setForm(blankForm);
    setEditingId('');
  }

  function deleteCustomRecipe(recipe) {
    if (!window.confirm(`Remove “${recipe.title}” from Chef Studio?`)) return;
    removeRecipe(recipe.id);
    if (editingId === recipe.id) resetForm();
  }

  if (user?.role !== 'admin') return <main className="collection-page container chef-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Chef Studio</span></div><section className="chef-hero"><div><span className="eyebrow"><Icon name="chef" size={16} /> Restricted workspace</span><h1>Chef <em>Studio.</em></h1><p>Only a Chef Admin can add, edit, or remove recipes. Create an admin account with the demo access code to open the recipe editor.</p><Link className="button button--primary" to="/signup">Create Chef Admin account <Icon name="arrow" size={17} /></Link></div><div className="chef-hero__badge"><Icon name="chef" size={25} /><span>Admin<br />access</span></div></section><p className="auth-disclaimer">This role check is for the front-end demo only. A production site must verify admin permissions on its server.</p></main>;

  return <div className="collection-page container chef-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Chef Studio</span></div>
    <section className="chef-hero"><div><span className="eyebrow"><Icon name="chef" size={16} /> Your kitchen, your rules</span><h1>Chef <em>Studio.</em></h1><p>Add a family favorite, edit a recipe, and save your allergy preferences so the recipe collection can filter around them.</p></div><div className="chef-hero__badge"><Icon name="sparkle" size={25} /><strong>{recipes.length}</strong><span>recipes in<br />your studio</span></div></section>

    <section className="allergy-settings" aria-labelledby="allergy-settings-title">
      <div className="allergy-settings__intro"><span className="eyebrow">Your kitchen profile</span><h2 id="allergy-settings-title">Allergies to avoid</h2><p>Choose ingredients you need to avoid. Matching recipes will be hidden from the browse list, and flagged on their recipe page.</p></div>
      <div className="allergen-options">{allergens.map((allergen) => <label className="allergen-option" key={allergen.id}><input type="checkbox" checked={allergyPreferences.includes(allergen.id)} onChange={() => togglePreference(allergen.id)} /><span className="custom-check"><Icon name="check" size={13} /></span>{allergen.label}</label>)}</div>
      <p className="allergy-safety"><Icon name="sparkle" size={16} /> This preference is a reminder, not a safety check. Always read product labels and prevent cross-contact. <a href="https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies" target="_blank" rel="noreferrer">FDA food-allergy guidance</a>.</p>
    </section>

    <div className="chef-workspace">
      <section className="chef-editor" id="chef-recipe-form" aria-labelledby="chef-form-title">
        <div className="chef-section-heading"><div><span className="eyebrow">Recipe notebook</span><h2 id="chef-form-title">{editingId ? 'Edit a recipe' : 'Add a recipe'}</h2></div>{editingId && <button className="text-link" type="button" onClick={resetForm}>Cancel edit</button>}</div>
        {message && <div className="chef-message" role="status">{message}</div>}
        <form className="chef-form" onSubmit={submitRecipe}>
          <div className="chef-form__row"><div className="form-field"><label htmlFor="chef-title">Recipe name</label><input id="chef-title" className="chef-text-input" name="title" value={form.title} onChange={changeField} required maxLength="80" placeholder="Grandma’s tomato soup" /></div><div className="form-field"><label htmlFor="chef-category">Category</label><select id="chef-category" className="chef-text-input" name="category" value={form.category} onChange={changeField}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Dessert</option><option>Snack</option></select></div></div>
          <div className="form-field"><label htmlFor="chef-description">A short description</label><textarea id="chef-description" className="chef-text-input" name="description" value={form.description} onChange={changeField} rows="2" required maxLength="240" placeholder="What makes this one special?" /></div>
          <div className="chef-form__row"><div className="form-field"><label htmlFor="chef-time">Total time (minutes)</label><input id="chef-time" className="chef-text-input" name="time" type="number" min="1" max="1440" value={form.time} onChange={changeField} required /></div><div className="form-field"><label htmlFor="chef-servings">Servings</label><input id="chef-servings" className="chef-text-input" name="servings" type="number" min="1" max="30" value={form.servings} onChange={changeField} required /></div></div>
          <div className="form-field"><label htmlFor="chef-image">Food photo URL <span>(optional)</span></label><input id="chef-image" className="chef-text-input" name="image" type="url" value={form.image} onChange={changeField} placeholder="https://…" /></div>
          <div className="form-field"><label htmlFor="chef-source">Recipe source URL <span>(optional)</span></label><input id="chef-source" className="chef-text-input" name="source" type="url" value={form.source} onChange={changeField} placeholder="Link to the original recipe" /></div>
          <div className="form-field"><label htmlFor="chef-ingredients">Ingredients and swaps</label><textarea id="chef-ingredients" className="chef-text-input chef-text-input--code" name="ingredientText" value={form.ingredientText} onChange={changeField} rows="6" required /><small>One ingredient per line: <code>amount | unit | ingredient | alternative 1, alternative 2</code></small></div>
          <div className="form-field"><label htmlFor="chef-steps">Cooking steps</label><textarea id="chef-steps" className="chef-text-input" name="stepsText" value={form.stepsText} onChange={changeField} rows="5" required /><small>Put each step on its own line.</small></div>
          <fieldset className="chef-allergens"><legend>Allergens in this recipe</legend><p>Select all that apply to the listed ingredients.</p><div className="allergen-options allergen-options--form">{allergens.map((allergen) => <label className="allergen-option" key={allergen.id}><input type="checkbox" checked={form.allergens.includes(allergen.id)} onChange={() => toggleAllergen(allergen.id)} /><span className="custom-check"><Icon name="check" size={13} /></span>{allergen.label}</label>)}</div></fieldset>
          <button className="button button--primary button--full" type="submit"><Icon name="check" size={17} />{editingId ? 'Save recipe changes' : 'Add recipe to my collection'}</button>
        </form>
      </section>

      <section className="chef-library" aria-labelledby="chef-library-title">
        <div className="chef-section-heading"><div><span className="eyebrow">Your whole recipe book</span><h2 id="chef-library-title">Edit a recipe</h2></div></div>
        <label className="chef-search"><Icon name="search" size={17} /><span className="sr-only">Search recipes to edit</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a recipe to edit" /></label>
        <div className="chef-recipe-list">{filteredRecipes.map((recipe) => <article className="chef-recipe-row" key={recipe.id}><img src={recipe.image} alt="" loading="lazy" /><div><strong>{recipe.title}</strong><small>{recipe.category} · {recipe.time} min</small></div><button className="button button--outline" type="button" onClick={() => editRecipe(recipe)}>Edit</button>{recipe.id.startsWith('custom-') && <button className="icon-button chef-delete" type="button" onClick={() => deleteCustomRecipe(recipe)} aria-label={`Remove ${recipe.title}`}><Icon name="trash" size={16} /></button>}</article>)}</div>
        <div className="chef-tip"><Icon name="leaf" size={18} /><p>Your new and edited recipes are saved on this device and appear in search, meal planning and your recipe collection.</p></div>
      </section>
    </div>
    <section className="chef-preview"><div className="section-heading"><div><span className="eyebrow">Fresh from your notebook</span><h2>Latest recipes</h2></div><Link to="/recipes" className="text-link">Browse the collection <Icon name="arrow" size={15} /></Link></div><div className="recipe-grid recipe-grid--three">{recipes.slice(-3).reverse().map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div></section>
  </div>;
}
