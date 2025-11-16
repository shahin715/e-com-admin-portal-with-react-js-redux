// Import Dependencies
import { navigationMenus } from '@/app/navigation/navigationMenus';
import Error404 from '@/app/pages/errors/404';
import { isAuthenticated } from '@/constants/app.constant';
import routePaths from '@/constants/routePaths.constant';
import { extractMenuPaths } from '@/utils/extractMenuPaths';
import { restrictRouteAccess } from '@/utils/restrictRouteAccess';
import { Navigate, useLocation, useOutlet } from 'react-router';

// Local Imports

// ----------------------------------------------------------------------

export default function AuthGuard() {
    const outlet = useOutlet();
    const location = useLocation();
    const allRoutes = extractMenuPaths(navigationMenus);

    if (!isAuthenticated) {
        return (
            <Navigate
                to={`${routePaths.ROUTE_GHOST_ENTRY_PATH}?${routePaths.REDIRECT_URL_KEY}=${location.pathname}`}
                replace
            />
        );
    }

    // If current path is NOT in allowed paths, redirect or show "Unauthorized"
    if (restrictRouteAccess(location.pathname, allRoutes)) {
        return <>{outlet}</>;
    } else if (location.pathname === routePaths.ROUTE_HOME) {
        // If authenticated and authorized, render the outlet
        return <Navigate to={routePaths.ROUTE_DASHBOARD} />;
    } else {
        return <Error404 />;
    }
}
