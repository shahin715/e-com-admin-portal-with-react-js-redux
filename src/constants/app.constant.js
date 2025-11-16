import { environment } from "../configs/environment.config";

// Application Constants
export const isAuthenticated = false;

// Auth Token Name from environment config
export const AUTH_TOKEN = environment.authTokenName;

// Navigation Types
export const NAV_TYPE = {
    ROOT: "root",
    GROUP: "group",
    COLLAPSE: "collapse",
    ITEM: "item",
    HIDDEN: "hidden-item",
    DIVIDER: "divider",
}