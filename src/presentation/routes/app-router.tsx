import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/app-layout';
import { DiscoverPage } from '../pages/discover-page';
import { ExplorePage } from '../pages/explore-page';
import { FavoritesPage } from '../pages/favorites-page';
import { DashboardPage } from '../pages/dashboard-page';
import { RecipesPage } from '../pages/recipes-page';
import { MealPlannerPage } from '../pages/meal-planner-page';
import { GroceryListPage } from '../pages/grocery-list-page';
import { SettingsPage } from '../pages/settings-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DiscoverPage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'planner',
        element: <MealPlannerPage />,
      },
      {
        path: 'recipes',
        element: <RecipesPage />,
      },
      {
        path: 'grocery',
        element: <GroceryListPage />,
      },
      {
        path: 'nutrition',
        element: <DashboardPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
