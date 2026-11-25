# Recipe Studio

A colorful, responsive recipe front end built with React and Vite. Recipe Studio makes it easy to find a dependable recipe, save favorites, plan a few dinners and keep a shopping list close by.

## Run it

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. On Windows, double-click `START-RECIPE-STUDIO.bat`. It installs the project packages the first time and opens the site.

Or, open this folder in a terminal, run `npm install`, then run `npm run dev` and open the local address printed in the terminal.

To make a production build, run `npm run build`. To preview that build locally, run `npm run preview`.

## Try the sign-in page

Choose **Fill demo login** on the sign-in page, then press **Sign in**. Or create a display account with any valid email and a password. To open Chef Studio, choose **Chef Admin** during sign-up and enter the demo code `CHEF2026`. Your role, favorites, meal plan and shopping list are stored in your browser.

This project has front-end demo accounts only. The Chef Admin code and role are checked in the browser, so this is a demonstration gate, not production security. It does not send credentials to a server or create a secure online account. Do not use a real password here.

## What’s included

- Six source-linked recipes with serving controls, checkable ingredients, a step-by-step cooking view and a print-friendly recipe page.
- Search by dish or ingredient, category filters, sorting and saved favorites.
- A seven-day dinner planner and an editable shopping list. Both keep their data on this device.
- Chef Studio is gated to Chef Admin demo accounts; admins can add and edit recipes, save allergy preferences, filter recipe results, and select ingredient swaps.
- Sign-in and sign-up screens with browser validation, a show-password control and clear demo-account behavior.
- Responsive navigation, semantic page sections, descriptive photo text, visible keyboard focus, reduced-motion support and a skip link.
- Lazy-loaded page routes, a shared app context, reusable recipe cards, custom storage hooks and a page-level error boundary.
- Vite production build configuration, search/social metadata, a Vercel rewrite file and a project `.gitignore`.

## Course outcome map

| Outcome | Where to see it |
| --- | --- |
| CO-1: Git and workflow | `.gitignore` and the Git steps below. |
| CO-1: HTML5 | `index.html` and JSX pages use semantic headers, navigation, main sections, forms, labels, inputs, buttons and footers. |
| CO-2: CSS and responsive design | `src/styles.css` contains the design system, Grid and Flexbox layouts, responsive breakpoints, transitions, focus styles, print styles and reduced-motion handling. |
| CO-2: JavaScript | Recipe data is represented with objects and arrays. Search and sorting, form validation, browser storage, state updates, ingredient scaling and error handling are implemented in the app. |
| CO-3: React | `src/pages`, `src/components`, `src/context/AppContext.jsx` and `src/hooks/useLocalStorage.js` show components, props, state, routing, context, reusable UI and hooks. |
| CO-4: Advanced React | The app includes a custom storage hook, lazy route loading and `src/components/ErrorBoundary.jsx`. |
| CO-6: Production React | Vite build and preview scripts, route chunking, memoized recipe cards, accessibility patterns and Vercel route fallback are included. |

This is a front-end project, so the demo does not include a real Node/Express API, Next.js server rendering, NextAuth, MongoDB, or server-side authentication. Those need a server and private environment variables before the sign-in screen can become a production account system. The visual front end is ready to connect to one.

Allergy tags and ingredient swaps are reminders only. Always check product packaging and preparation surfaces for allergens and cross-contact; recipe text or a suggested swap cannot guarantee that food is safe. See the [FDA food allergy guidance](https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies).

## Git workflow

From this folder, an initial local repository can be created with:

```bash
git init
git add .
git commit -m "Build Recipe Studio front end"
git switch -c feature/recipe-detail
```

After making a change, commit it on the feature branch, then merge that branch back into `main`. To connect a remote, use the repository URL supplied by your course or hosting provider:

```bash
git remote add origin <repository-url>
git push -u origin main
```

## Recipe and photo sources

Recipe ingredients and methods are adapted from these published recipes; each detail page links to its source.

- [BBC Good Food: Shakshuka](https://www.bbcgoodfood.com/recipes/shakshuka)
- [BBC Good Food: Overnight oats](https://www.bbcgoodfood.com/recipes/overnight-oats)
- [BBC Good Food: Avocado toast](https://www.bbcgoodfood.com/recipes/avocado-toast)
- [BBC Good Food: Creamy cheese & tomato macaroni](https://www.bbcgoodfood.com/recipes/creamy-cheese-tomato-macaroni)
- [BBC Good Food: Tomato & chickpea curry](https://www.bbcgoodfood.com/recipes/tomato-chickpea-curry)
- [BBC Good Food: Lemon & herb chicken traybake](https://www.bbcgoodfood.com/recipes/lemon-herb-chicken-traybake-with-butter-beans-potato-wedges)

Food photography is loaded from Unsplash. Photo links and descriptions are included in `src/data/recipes.js`.

## Main files

```text
src/
  components/     Shared navigation, icons, recipe cards and error boundary
  context/        Favorites, sign-in demo, meal plan and shopping-list state
  data/           Recipe ingredients, instructions, image credits and sources
  hooks/          Local-storage hook
  pages/          Home, recipes, recipe detail, saved, planner, list and account pages
  styles.css      Colors, layouts, responsive rules, focus and print styles
```
"# recipiee" 
