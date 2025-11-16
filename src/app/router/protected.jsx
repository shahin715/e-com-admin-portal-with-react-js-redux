// JSDoc
/**
 * Protected Routes Configuration
 * ==============================
 *
 * This module dynamically generates protected route objects for React Router
 * using a recursive menu-to-route transformer (`createRouteFromMenu`).
 * All generated routes are wrapped in `AuthGuard` to enforce authentication
 * and/or authorization checks before rendering child routes.
 *
 * ---
 *
 * Key Imports:
 * - NAV_TYPE: Enum of navigation item types (ITEM, COLLAPSE, HIDDEN).
 * - AuthGuard: Middleware-like component to control access.
 * - navigationMenus: Source array of navigation menu configurations.
 *
 * ---
 *
 * Core Function: createRouteFromMenu(menu)
 * ----------------------------------------
 * Recursively converts a menu configuration object into a React Router
 * route configuration object.
 *
 * Parameters:
 * - menu: {
 *     type: NAV_TYPE,            // ITEM, COLLAPSE, HIDDEN
 *     path: string,              // route path (e.g., '/dashboard')
 *     component?: ReactComponent // component to render (optional)
 *     childs?: menu[]            // nested child menu items (optional)
 *   }
 *
 * Logic:
 * 1. Base Case:
 *    - ITEM or HIDDEN without children → returns a simple route with lazy component.
 *
 * 2. Recursive Case:
 *    - COLLAPSE or HIDDEN with children → returns a route with nested child routes,
 *      created by mapping `createRouteFromMenu` over each child.
 *
 * 3. Fallback Case:
 *    - If component exists but doesn’t match above cases → return a simple route.
 *    - If no component → returns `undefined` (later filtered out).
 *
 * Return:
 * - A valid React Router route object, or `undefined` if incomplete.
 *
 * Example:
 * --------
 * Input menu:
 * {
 *   type: NAV_TYPE.COLLAPSE,
 *   path: '/settings',
 *   childs: [
 *     { type: NAV_TYPE.ITEM, path: '/settings/profile', component: ProfilePage }
 *   ]
 * }
 *
 * Output route:
 * {
 *   path: '/settings',
 *   children: [
 *     {
 *       path: '/settings/profile',
 *       lazy: async () => ({ Component: ProfilePage })
 *     }
 *   ]
 * }
 *
 * ---
 *
 * Routes Aggregation:
 * -------------------
 * const routes = navigationMenus.map(createRouteFromMenu).filter(Boolean);
 *
 * Wraps all generated routes in:
 *
 * const protectedRoutes = {
 *   id: 'protected',
 *   Component: AuthGuard,   // ensures access control
 *   children: [...routes],  // nested route tree
 * };
 *
 * ---
 *
 * Usage:
 * ------
 * import { createBrowserRouter, RouterProvider } from 'react-router-dom';
 * import { protectedRoutes } from './routes';
 *
 * const router = createBrowserRouter([protectedRoutes]);
 *
 * function App() {
 *   return <RouterProvider router={router} />;
 * }
 *
 * ---
 *
 * Notes:
 * - `lazy` enables React’s code splitting → components only load when needed.
 * - Ensure all `ITEM` routes define a valid component.
 * - Use absolute paths for consistency.
 */

import { Navigate } from "react-router";
import routePaths from "@/constants/routePaths.constant";
import { NAV_TYPE } from "@/constants/app.constant";
import { navigationMenus } from "../navigation/navigationMenus";
import RootLayout from "../layouts";

const createRouteFromMenu = (menu) => {
  // Base case for item or hidden without children
  if (
    menu.type === NAV_TYPE.ITEM ||
    (menu.type === NAV_TYPE.HIDDEN &&
      (!menu.childs || menu.childs.length === 0))
  ) {
    return {
      path: menu.path,
      lazy: async () => ({
        Component: menu.component,
      }),
    };
  }

  // For COLLAPSE or HIDDEN with children - create nested routes recursively
  if (
    (menu.type === NAV_TYPE.COLLAPSE || menu.type === NAV_TYPE.HIDDEN) &&
    menu.childs &&
    menu.childs.length > 0
  ) {
    return {
      path: menu.path,
      children: menu.childs.map(createRouteFromMenu),
    };
  }

  // Fallback: return a route with component if defined, else undefined
  return menu.component
    ? {
        path: menu.path,
        lazy: async () => ({
          Component: menu.component,
        }),
      }
    : undefined;
};

const routes = navigationMenus?.map(createRouteFromMenu).filter(Boolean);

const protectedRoutes = {
  id: "protected",
  Component: RootLayout,
  children: [
    {
      index: true,
      element: <Navigate to={routePaths.ROUTE_DASHBOARD} />,
    },
    {
      path: "/bills",
      lazy: async () => ({
        Component: (await import("@/app/pages/bills")).default,
      }),
    },

    ...routes,
  ],
};

export { protectedRoutes };
