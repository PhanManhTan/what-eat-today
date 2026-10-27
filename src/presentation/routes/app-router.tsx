import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/app-layout';
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
        element: <DashboardPage />,
      },
      {
        path: 'recipes',
        element: <RecipesPage />,
      },
      {
        path: 'planner',
        element: <MealPlannerPage />,
      },
      {
        path: 'grocery',
        element: <GroceryListPage />,
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
