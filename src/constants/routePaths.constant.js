import { joinPaths } from "@/utils/joinPaths";


// Redirect Paths
const REDIRECT_URL_KEY = "redirect";

// Ghost Routes
const ROUTE_GHOST_ENTRY_PATH = "/logi";
const ROUTE_LOGIN = '/login'
const ROUTE_REGISTER = '/register'

// Protected Routes
const ROUTE_DASHBOARD = "/dashboard";
const ROOT_PROFILE = "/profile";
const ROUTE_MY_PROFILE = joinPaths(ROOT_PROFILE, "/my-profile");

// Public Routes
const ROUTE_HOME = "/home";
const ROUTE_ABOUT = "/about";
const ROUTE_CONTACT = "/contact";
const ROUTE_SHOPS = "/shops";

const routePaths = {
    // Redirect Paths
    REDIRECT_URL_KEY,

    // Ghost Routes
    ROUTE_GHOST_ENTRY_PATH,
    ROUTE_LOGIN,
    ROUTE_REGISTER,

    // Protected Routes
    ROUTE_MY_PROFILE,
    ROOT_PROFILE,
    ROUTE_DASHBOARD,

    // Public Routes
    ROUTE_HOME,
    ROUTE_ABOUT,
    ROUTE_CONTACT,
    ROUTE_SHOPS
}

export default routePaths;