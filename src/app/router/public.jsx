import routePaths from '@/constants/routePaths.constant';


const publicRoutes = {
    id: 'public',
    children: [
        {
            path: routePaths.ROUTE_HOME,
            lazy: async () => ({
                Component: (await import('../pages/home')).default,
            }),
        },
        {
            path: routePaths.ROUTE_SHOPS,
            lazy: async () => ({
                Component: (await import('../pages/shops')).default,
            }),
        },
        {
            path: `${routePaths.ROUTE_SHOPS}/:id`,
            lazy: async () => ({
                Component: (await import('../pages/shops/Details')).default,
            }),
        },
    ],
};

export { publicRoutes };
