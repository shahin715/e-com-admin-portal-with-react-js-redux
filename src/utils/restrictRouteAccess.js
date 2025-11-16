import { match } from "path-to-regexp";
/**
 * Checks if a given pathname is allowed by matching it against a list of permitted route patterns.
 * Uses `path-to-regexp` to support dynamic routes (e.g., `/users/:id`) and wildcards (e.g., `/settings/*`).
 * Useful for role-based route authorization in a React application, ensuring users only access permitted routes.
 *
 * @param {string} pathname - The URL pathname to check (e.g., `/users/123`).
 * @param {string[]} allowedPaths - An array of allowed path patterns (e.g., `['/dashboard', '/users/:id']`).
 * @returns {boolean} True if the pathname matches any allowed path pattern, false otherwise.
 * @example
 * import { match } from 'path-to-regexp';
 *
 * const allowedPaths = ['/dashboard', '/users/:id', '/settings/*'];
 * console.log(restrictRouteAccess('/users/123', allowedPaths)); // true
 * console.log(restrictRouteAccess('/admin', allowedPaths)); // false
 * console.log(restrictRouteAccess('/settings/profile', allowedPaths)); // true
 */
export const restrictRouteAccess = (pathname, allowedPaths) => {
    return allowedPaths.some((allowedPath) => {
        const matcher = match(allowedPath, { decode: decodeURIComponent });
        return matcher(pathname);
    });
};