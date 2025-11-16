import { NAV_TYPE } from "@/constants/app.constant";
import { PERMISSIONS } from "@/constants/permission.constant";
import routePaths from "@/constants/routePaths.constant";
import { FiHome } from "react-icons/fi";
import { PiWallet } from "react-icons/pi";
import { TbHomeBitcoin } from "react-icons/tb";


export const navigationMenus = [
    {
        id: routePaths.ROUTE_DASHBOARD,
        path: routePaths.ROUTE_DASHBOARD,
        type: NAV_TYPE.ITEM,
        title: "Dashboard",
        transKey: "nav.dashboards.dashboard",
        Icon: FiHome,
        component: (await import("../pages/dashboard")).default,
        permissions: [
            PERMISSIONS.ALL,
        ],
    },
    {
        id: routePaths.ROOT_PROFILE,
        path: routePaths.ROOT_PROFILE,
        type: NAV_TYPE.COLLAPSE,
        title: "Profile",
        transKey: "",
        Icon: PiWallet,
        childs: [
            {
                id: routePaths.ROUTE_MY_PROFILE,
                path: routePaths.ROUTE_MY_PROFILE,
                type: NAV_TYPE.ITEM,
                title: "My Profile",
                transKey: "",
                Icon: TbHomeBitcoin,
                component: (await import("../pages/my-profile")).default,
                permissions: [
                    PERMISSIONS.ALL
                ],
            },
            {
                id: `${routePaths.ROUTE_MY_PROFILE}/:id`,
                path: `${routePaths.ROUTE_MY_PROFILE}/:id`,
                type: NAV_TYPE.HIDDEN,
                title: 'Profile Details',
                transKey: '',
                Icon: TbHomeBitcoin,
                component: (await import('../pages/my-profile/components/ProfileDetails')).default,
                permissions: [
                    PERMISSIONS.ALL
                ],
                tooltip: "View Profile Details",
                arrowBack: true,
            },
        ],
    },
];