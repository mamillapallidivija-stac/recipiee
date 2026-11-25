import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { recipes as starterRecipes } from '../data/recipes.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('recipe-studio:favorites', []);
  const [shoppingList, setShoppingList] = useLocalStorage('recipe-studio:shopping-list', []);
  const [mealPlan, setMealPlan] = useLocalStorage('recipe-studio:meal-plan', {});
  const [user, setUser] = useLocalStorage('recipe-studio:user', null);
  const [accounts, setAccounts] = useLocalStorage('recipe-studio:accounts', []);
  const [recipeEdits, setRecipeEdits] = useLocalStorage('recipe-studio:recipe-edits', []);
  const [allergyPreferences, setAllergyPreferences] = useLocalStorage('recipe-studio:allergies', []);
  const [notice, setNotice] = useState('');

  const notify = useCallback((message) => {
    setNotice(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setNotice(''), 2800);
  }, []);

  const recipes = useMemo(() => {
    const editedById = new Map(recipeEdits.map((recipe) => [recipe.id, recipe]));
    const starterIds = new Set(starterRecipes.map((recipe) => recipe.id));
    return [
      ...starterRecipes.map((recipe) => editedById.get(recipe.id) || recipe),
      ...recipeEdits.filter((recipe) => !starterIds.has(recipe.id)),
    ];
  }, [recipeEdits]);

  const saveRecipe = useCallback((recipe) => {
    setRecipeEdits((current) => [...current.filter((item) => item.id !== recipe.id), recipe]);
    notify('Recipe saved in your Chef Studio');
  }, [notify, setRecipeEdits]);

  const removeRecipe = useCallback((id) => {
    setRecipeEdits((current) => current.filter((item) => item.id !== id));
    notify('Recipe removed from your Chef Studio');
  }, [notify, setRecipeEdits]);

  const toggleFavorite = useCallback((id) => {
    const hasRecipe = favorites.includes(id);
    setFavorites((current) => hasRecipe ? current.filter((item) => item !== id) : [...current, id]);
    notify(hasRecipe ? 'Removed from your saved recipes' : 'Recipe saved for later');
  }, [favorites, notify, setFavorites]);

  const addToShoppingList = useCallback((items) => {
    setShoppingList((current) => {
      const next = [...current];
      items.forEach((item) => {
        if (!next.some((entry) => entry.name.toLowerCase() === item.name.toLowerCase())) {
          next.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, name: item.name, checked: false });
        }
      });
      return next;
    });
    notify('Ingredients added to your shopping list');
  }, [notify, setShoppingList]);

  const value = useMemo(() => ({
    recipes,
    saveRecipe,
    removeRecipe,
    allergyPreferences,
    setAllergyPreferences,
    favorites,
    toggleFavorite,
    shoppingList,
    setShoppingList,
    addToShoppingList,
    mealPlan,
    setMealPlan,
    user,
    createAccount: (name, email, role) => {
      const account = { name, email, role };
      setAccounts((current) => [...current.filter((item) => item.email !== email), account]);
      setUser(account);
      notify(`Welcome in, ${name.split(' ')[0]}!`);
    },
    signIn: (name, email) => {
      const account = accounts.find((item) => item.email === email);
      setUser({ name: account?.name || name, email, role: account?.role || 'cook' });
      notify(`Welcome in, ${name.split(' ')[0]}!`);
    },
    signOut: () => {
      setUser(null);
      notify('You’re signed out');
    },
    notice,
    notify,
  }), [recipes, saveRecipe, removeRecipe, allergyPreferences, setAllergyPreferences, favorites, toggleFavorite, shoppingList, setShoppingList, addToShoppingList, mealPlan, setMealPlan, user, setUser, accounts, setAccounts, notice, notify]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
