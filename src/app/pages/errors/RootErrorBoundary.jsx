// Import Depndencies
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { lazy } from 'react';
import { Loadable } from '../../../components/shared/Loadable';

// ----------------------------------------------------------------------

const app = {
    401: lazy(() => import('./401')),
    404: lazy(() => import('./404')),
    429: lazy(() => import('./429')),
    500: lazy(() => import('./500')),
};

function RootErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        const Component = Loadable(app[error.status]);
        return <Component />;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
        </div>
    );
}

export default RootErrorBoundary;
