import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { recipes } = useApp();
  const starterRecipes = [recipes[0], recipes[3], recipes[4]];

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/recipes${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  }

  return <>
    <section className="hero container">
      <div className="hero__copy">
        <span className="eyebrow"><span className="eyebrow__dot" /> A good place to start</span>
        <h1>Let dinner feel a little <em>easier.</em></h1>
        <p className="hero__description">Find recipes you’ll actually want to make. Save the good ones, plan the week and spend less time wondering what’s for dinner.</p>
        <form className="hero-search" onSubmit={handleSearch} role="search">
          <Icon name="search" size={19} />
          <label htmlFor="home-search" className="sr-only">Search recipes or ingredients</label>
          <input id="home-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “something with tomatoes”…" />
          <button className="hero-search__button" type="submit" aria-label="Search recipes"><Icon name="arrow" size={18} /></button>
        </form>
        <div className="hero__actions">
          <Link to="/recipes" className="button button--primary">Find a recipe <Icon name="arrow" size={17} /></Link>
          <Link to="/meal-plan" className="button button--quiet">Plan my week</Link>
        </div>
        <div className="hero__note"><span className="hero__avatars"><i>M</i><i>J</i><i>A</i></span><span>Little wins in real kitchens, every day.</span></div>
      </div>
      <div className="hero__visual">
        <img className="hero__image" src={recipes[0].image} alt={recipes[0].imageAlt} fetchPriority="high" />
        <div className="hero__image-wash" />
        <div className="hero__photo-caption"><span>Our pick for this week</span><strong>Easy shakshuka</strong><small>Bright, cozy & ready in 25 min</small></div>
        <Link className="hero__photo-link" to={`/recipes/${recipes[0].slug}`} aria-label="View this week’s pick"><Icon name="arrow" size={18} /></Link>
        <div className="hero__stamp"><span>Made for</span><strong>real life</strong><Icon name="sparkle" size={18} /></div>
      </div>
    </section>

    <section className="proof-strip" aria-label="Recipe Studio features">
      <div className="container proof-strip__inner">
        <div><Icon name="leaf" /><span><strong>Thoughtful recipes</strong><small>Trusted sources, clear steps</small></span></div>
        <div><Icon name="heart" /><span><strong>Keep your favorites</strong><small>Your collection, your way</small></span></div>
        <div><Icon name="calendar" /><span><strong>Make a little plan</strong><small>A calmer week starts here</small></span></div>
      </div>
    </section>

    <section className="section container">
      <div className="section-heading">
        <div><span className="eyebrow">Cook something lovely</span><h2>Recipes worth coming back to</h2><p>Comforting favorites, with just enough newness to keep things fun.</p></div>
        <Link className="text-link section-heading__link" to="/recipes">See all recipes <Icon name="arrow" size={16} /></Link>
      </div>
      <div className="recipe-grid recipe-grid--three">{starterRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div>
    </section>

    <section className="category-section">
      <div className="container category-section__inner">
        <div className="category-intro"><span className="eyebrow">What sounds good?</span><h2>Pick a mood.<br /><em>We’ll find the food.</em></h2><p>Start with what you’re craving. The good stuff is just around the corner.</p></div>
        <div className="category-list">
          <Link to="/recipes?category=Breakfast" className="category-link"><span className="category-link__emoji" aria-hidden="true">☀️</span><span><strong>Slow morning</strong><small>Breakfast & brunch</small></span><Icon name="arrow" size={17} /></Link>
          <Link to="/recipes?category=Vegetarian" className="category-link"><span className="category-link__emoji" aria-hidden="true">🥗</span><span><strong>Something fresh</strong><small>Vegetarian favorites</small></span><Icon name="arrow" size={17} /></Link>
          <Link to="/recipes?category=Dinner" className="category-link"><span className="category-link__emoji" aria-hidden="true">🍋</span><span><strong>Easy evening</strong><small>Weeknight dinners</small></span><Icon name="arrow" size={17} /></Link>
          <Link to="/meal-plan" className="category-link"><span className="category-link__emoji" aria-hidden="true">🗓️</span><span><strong>Plan ahead</strong><small>Make the week feel lighter</small></span><Icon name="arrow" size={17} /></Link>
        </div>
      </div>
    </section>

    <section className="section container home-cta">
      <div className="home-cta__icon"><Icon name="heart" size={25} /></div>
      <div><span className="eyebrow">Your little recipe book</span><h2>Save the ones you love.</h2><p>Keep your best finds close, then pick up right where you left off.</p></div>
      <Link to="/saved" className="button button--light">See saved recipes <Icon name="arrow" size={17} /></Link>
      <div className="home-cta__decoration" aria-hidden="true">✳</div>
    </section>
  </>;
}
