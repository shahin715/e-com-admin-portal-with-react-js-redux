import routePaths from '@/constants/routePaths.constant';
import GhostGuard from '@/middleware/GhostGuard';

const ghostRoutes = {
    id: 'ghost',
    Component: GhostGuard,
    children: [
        {
            path: routePaths.ROUTE_GHOST_ENTRY_PATH,
            lazy: async () => ({
                Component: (await import('../pages/auth')).default,
            }),
        },
    ],
};

export { ghostRoutes };
