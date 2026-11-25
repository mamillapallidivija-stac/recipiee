export const allergens = [
  { id: 'milk', label: 'Milk' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'wheat', label: 'Wheat' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'tree-nuts', label: 'Tree nuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'sesame', label: 'Sesame' },
  { id: 'fish', label: 'Fish' },
  { id: 'shellfish', label: 'Crustacean shellfish' },
];

const ingredientSwaps = [
  { match: /\beggs?\b/i, options: ['Crumbled firm tofu (different texture)', 'Chickpea flour scramble'] },
  { match: /almond|cashew|walnut|hazelnut|nut butter/i, options: ['Sunflower seed butter (check label)', 'Tahini (contains sesame)'] },
  { match: /\bmilk\b/i, options: ['Unsweetened oat drink (check label)', 'Unsweetened rice drink (check label)'] },
  { match: /yogurt|yoghurt/i, options: ['Plain oat yogurt (check label)', 'Plain coconut yogurt (check label)'] },
  { match: /cr[eè]me fra[iî]che|cream|parmesan|cheese/i, options: ['Plain dairy-free cooking cream (check label)', 'Nutritional yeast for a savory finish'] },
  { match: /sourdough|bread|macaroni|pasta|wheat/i, options: ['A certified wheat-free alternative (check label)'] },
  { match: /chicken|thighs?/i, options: ['Chickpeas for a plant-based version'] },
  { match: /butter beans/i, options: ['Cannellini beans'] },
];

export function alternativesFor(ingredient) {
  if (ingredient.alternatives?.length) return ingredient.alternatives;
  const match = ingredientSwaps.find((entry) => entry.match.test(ingredient.name));
  return match?.options || [];
}

export function allergenLabels(ids) {
  return ids.map((id) => allergens.find((item) => item.id === id)?.label || id);
}
