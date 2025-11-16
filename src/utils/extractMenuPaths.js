/**
 * Recursively extracts all `path` values from a navigation menu structure.
 *
 * This utility handles both:
 * - A single menu object with optional nested `childs`.
 * - An array of menu objects (top-level menu list).
 *
 * @param {Object|Object[]} menu - The menu configuration or array of menu items.
 * @param {string} [menu.path] - The URL path for the current menu item.
 * @param {Object[]} [menu.childs] - Optional array of child menu items for nested structures.
 *
 * @returns {string[]} An array of all path strings found in the menu structure.
 *
 * @example
 * // Example input:
 * const menu = [
 *   { path: '/dashboard' },
 *   {
 *     path: '/settings',
 *     childs: [
 *       { path: '/settings/profile' },
 *       { path: '/settings/security' }
 *     ]
 *   }
 * ];
 *
 * // Output:
 * extractMenuPaths(menu);
 * // → ["/dashboard", "/settings", "/settings/profile", "/settings/security"]
 */

export const extractMenuPaths = (menu) => {
    // Handle falsy input
    if (!menu) return [];

    // If menu is an array (top-level menu), process each item
    if (Array.isArray(menu)) {
        return menu.flatMap(extractMenuPaths);
    }

    // Initialize paths array
    const paths = [];

    // Add the current menu item's path if it exists
    if (menu.path) {
        paths.push(menu.path);
    }

    // Process child items if they exist
    if (menu.childs && menu.childs.length > 0) {
        paths.push(...menu.childs.flatMap(extractMenuPaths));
    }

    return paths;
};