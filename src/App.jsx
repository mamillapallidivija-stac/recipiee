import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RecipesPage = lazy(() => import('./pages/RecipesPage.jsx'));
const RecipePage = lazy(() => import('./pages/RecipePage.jsx'));
const SavedPage = lazy(() => import('./pages/SavedPage.jsx'));
const MealPlanPage = lazy(() => import('./pages/MealPlanPage.jsx'));
const ShoppingListPage = lazy(() => import('./pages/ShoppingListPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage.jsx'));
const ChefPage = lazy(() => import('./pages/ChefPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function PageLoader() {
  return <div className="page-loader" role="status"><span className="loader-dot" />Opening the recipe book…</div>;
}

export default function App() {
  return <ErrorBoundary><Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:slug" element={<RecipePage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="meal-plan" element={<MealPlanPage />} />
        <Route path="shopping-list" element={<ShoppingListPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="chef" element={<ChefPage />} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense></ErrorBoundary>;
}
