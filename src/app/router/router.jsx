// Import Dependencies
import { createBrowserRouter } from 'react-router';

// Local Imports
import { protectedRoutes } from './protected';
import { ghostRoutes } from './ghost';
import SplashScreen from '@/components/shared/SplashScreen';
import RootErrorBoundary from '../pages/errors/RootErrorBoundary';
import { publicRoutes } from './public';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
    {
        id: 'root',
        // Component: RootLayout,
        hydrateFallbackElement: <SplashScreen />,
        ErrorBoundary: RootErrorBoundary,
        children: [protectedRoutes, ghostRoutes, publicRoutes],
    },
]);

export default router;
