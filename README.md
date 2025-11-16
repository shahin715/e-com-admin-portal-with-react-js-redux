# E-Commerce Admin Portal (React + Redux + Vite)

This project is an E-Commerce Admin Portal built with **React**, **Redux**, and **Vite**. It features dynamic protected routing, role-based access, modular navigation, and a scalable architecture suitable for modern admin dashboards.

---

## Features

-   **React 19** with functional components and hooks
-   **Vite** for fast development and build
-   **Dynamic Routing** using React Router v7
-   **Role-based Route Protection** with `AuthGuard` and `GhostGuard`
-   **Navigation Menu Configuration** for scalable route management
-   **Tailwind CSS** for utility-first styling
-   **i18n** support with dynamic language loading
-   **Reusable Components** (Header, Footer, SplashScreen, etc.)
-   **Mock Data** for products and categories
-   **ESLint** and Prettier for code quality

---

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm or yarn

### Installation

```sh
git clone https://github.com/your-username/e-com-admin-portal-with-react-js-redux.git
cd e-com-admin-portal-with-react-js-redux
npm install
```

### Development

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

---

## Project Structure

```
src/
  App.jsx                # App entry with RouterProvider
  main.jsx               # React root rendering
  index.css              # Global styles (Tailwind, fonts, base)
  app/
    layouts/             # Root layout (Header, Footer, Outlet)
    navigation/          # Navigation menu config
    pages/               # Page components (dashboard, profile, errors, etc.)
    router/              # Route definitions (protected, public, ghost)
  components/
    Header/              # Header and Navbar
    Footer/              # Footer
    shared/              # Shared UI (SplashScreen, Loadable)
  constants/             # App, permission, and route constants
  data/                  # Mock data for products/categories
  hooks/                 # Custom hooks (placeholder)
  i18n/                  # Language configs and translations
  middleware/            # AuthGuard, GhostGuard for route protection
  redux/                 # Redux setup (placeholder)
  styles/                # Base CSS
  utils/                 # Utility functions (path join, number format, etc.)
  assets/
    icons/               # Icon assets (placeholder)
    images/              # Image assets (placeholder)
```

---

## Routing & Navigation

-   **Dynamic Route Generation:**  
    Routes are generated from [`navigationMenus`](src/app/navigation/navigationMenus.js) using a recursive transformer.  
    See [`protected.jsx`](src/app/router/protected.jsx) and [`README.md`](src/app/router/README.md) for details.

-   **Route Guards:**

    -   [`AuthGuard`](src/middleware/AuthGuard.jsx): Protects authenticated routes and checks permissions.
    -   [`GhostGuard`](src/middleware/GhostGuard.jsx): Handles guest-only routes (e.g., login).

-   **Error Boundaries:**  
    Custom error pages for 401, 404, 429, and 500 errors.

---

## Utilities

-   [`joinPaths`](src/utils/joinPaths.js): Safely joins URL paths.
-   [`extractMenuPaths`](src/utils/extractMenuPaths.js): Recursively extracts all route paths from navigation menus.
-   [`restrictRouteAccess`](src/utils/restrictRouteAccess.js): Checks if a route is accessible based on allowed patterns.
-   [`formatNumber`](src/utils/formatNumber.js): Formats numbers with suffixes (k, M, B, T).

---

## Styling

-   **Tailwind CSS**: Utility-first CSS framework.
-   **Custom Fonts**: Montserrat via `@fontsource/montserrat`.

---

## Internationalization

-   Language configs in [`src/i18n/langs.js`](src/i18n/langs.js)
-   Dynamic import of translation files and locale data.

---

## Mock Data

-   See [`src/data/index.js`](src/data/index.js) for mock products and categories.

---

## Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm run clean`   | Remove build output      |

---

## License

MIT

---

## Credits

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Router](https://reactrouter.com/)
-   [React Icons](https://react-icons.github.io/react-icons/)
