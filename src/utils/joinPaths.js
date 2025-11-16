/**
 * Joins multiple path segments into a single path string.
 * Ensures there are no duplicate slashes.
 *
 * @param {string} root - The base/root path
 * @param {...string} segments - One or more path segments to join with root
 * @returns {string} The combined normalized path
 */
export function joinPaths(root, ...segments) {
    const trimSlashes = (str) => {
        while (str.startsWith("/")) str = str.slice(1);
        while (str.endsWith("/")) str = str.slice(0, -1);
        return str;
    };

    const cleanedSegments = [root, ...segments].map(trimSlashes).filter(Boolean);
    const joinedPath = cleanedSegments.join("/");

    return "/" + joinedPath;
}
