// Import Dependencies
import { Suspense } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component, Fallback) => (props) =>
    (
        <Suspense fallback={Fallback && <Fallback />}>
            <Component {...props} />
        </Suspense>
    );

export { Loadable };
