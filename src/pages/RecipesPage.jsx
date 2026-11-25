import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import Icon from '../components/Icon.jsx';
import { categories as starterCategories } from '../data/recipes.js';
import { useApp } from '../context/AppContext.jsx';
import { allergenLabels } from '../data/allergies.js';

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState('popular');
  const activeCategory = searchParams.get('category') || 'All recipes';
  const { favorites, recipes, allergyPreferences } = useApp();
  const categories = useMemo(() => [...new Set([...starterCategories.slice(0, 1), ...recipes.map((recipe) => recipe.category), ...starterCategories.filter((item) => ['Vegetarian', 'Under 30 min'].includes(item))])], [recipes]);

  const visibleRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const containsSelectedAllergy = (recipe.allergens || []).some((allergen) => allergyPreferences.includes(allergen));
      if (containsSelectedAllergy) return false;
      const matchesCategory = activeCategory === 'All recipes'
        || recipe.category === activeCategory
        || (activeCategory === 'Vegetarian' && recipe.tags.includes('Vegetarian'))
        || (activeCategory === 'Under 30 min' && recipe.time <= 30);
      const searchable = `${recipe.title} ${recipe.subtitle} ${recipe.description} ${recipe.category} ${recipe.tags.join(' ')} ${recipe.ingredients.map((item) => item.name).join(' ')}`.toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
    return [...filtered].sort((a, b) => sort === 'quickest' ? a.time - b.time : sort === 'alphabetical' ? a.title.localeCompare(b.title) : b.rating - a.rating);
  }, [activeCategory, allergyPreferences, recipes, search, sort]);

  function chooseCategory(category) {
    const next = new URLSearchParams(searchParams);
    category === 'All recipes' ? next.delete('category') : next.set('category', category);
    setSearchParams(next, { replace: true });
  }

  return <div className="collection-page container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Recipes</span></div>
    <div className="collection-hero">
      <div><span className="eyebrow"><span className="eyebrow__dot" /> A little inspiration</span><h1>Good things<br /><em>are cooking.</em></h1><p>Comforting favorites, fresh ideas and dependable recipes for whatever the day brings.</p></div>
      <div className="collection-hero__art"><img src="https://images.unsplash.com/photo-1542354255-839e272e3408?auto=format&fit=crop&w=720&q=85" alt="A colorful bowl filled with fresh vegetables and greens" loading="lazy" /><span>Find your<br /><strong>next favorite</strong></span></div>
    </div>
    <div className="collection-toolbar">
      <form className="collection-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <Icon name="search" size={19} /><label className="sr-only" htmlFor="recipe-search">Search recipes and ingredients</label>
        <input id="recipe-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a recipe or ingredient" />
        {search && <button type="button" className="search-clear" onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}
      </form>
      <label className="sort-control"><Icon name="filter" size={18} /><span className="sr-only">Sort recipes</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Most loved</option><option value="quickest">Quickest first</option><option value="alphabetical">A to Z</option></select><Icon name="chevron" size={15} /></label>
    </div>
    {allergyPreferences.length > 0 && <div className="allergy-filter-note"><Icon name="check" size={16} /><span>Filtering out recipes tagged with: {allergenLabels(allergyPreferences).join(', ')}</span><Link to="/chef">Edit allergy settings</Link></div>}
    <div className="filter-row" role="group" aria-label="Filter by category">{categories.map((category) => <button key={category} className={`filter-chip ${activeCategory === category ? 'is-active' : ''}`} onClick={() => chooseCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}</div>
    <div className="collection-results"><div><h2>{activeCategory === 'All recipes' ? 'All the good stuff' : activeCategory}</h2><p>{visibleRecipes.length} lovely {visibleRecipes.length === 1 ? 'recipe' : 'recipes'}{search && ` for “${search}”`}</p></div><span className="result-count">{favorites.length > 0 ? `${favorites.length} saved by you` : 'Made for real life'}</span></div>
    {visibleRecipes.length ? <div className="recipe-grid recipe-grid--three">{visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div> : <div className="empty-state empty-state--compact"><div className="empty-state__icon"><Icon name="search" size={26} /></div><h2>No recipes found yet</h2><p>Try another search or choose a different category.</p><button className="button button--outline" onClick={() => { setSearch(''); chooseCategory('All recipes'); }}>Clear filters</button></div>}
  </div>;
}
