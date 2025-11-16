// Import Dependencies
import { createBrowserRouter } from 'react-router';

// Local Imports
import { protectedRoutes } from './protected';
import { ghostRoutes } from './ghost';
import SplashScreen from '@/components/shared/SplashScreen';
import RootErrorBoundary from '../pages/errors/RootErrorBoundary';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
    {
        id: 'root',
        // Component: RootLayout,
        hydrateFallbackElement: <SplashScreen />,
        ErrorBoundary: RootErrorBoundary,
        children: [protectedRoutes, ghostRoutes],
    },
]);

export default router;
