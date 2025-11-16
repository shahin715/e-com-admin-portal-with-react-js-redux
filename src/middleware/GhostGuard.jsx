import { isAuthenticated } from '@/constants/app.constant';
import routePaths from '@/constants/routePaths.constant';
import { Navigate, useOutlet } from 'react-router';

export default function GhostGuard() {
    const outlet = useOutlet();

    const url = new URLSearchParams(window.location.search).get(
        routePaths.REDIRECT_URL_KEY
    );

    if (isAuthenticated) {
        if (!url) {
            // url is null or empty string
            return <Navigate to={routePaths.ROUTE_HOME} replace />;
        }
        // url exists and not empty
        return <Navigate to={url} replace />;
    }

    return <>{outlet}</>;
}
