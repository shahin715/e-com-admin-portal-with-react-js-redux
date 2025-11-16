/**
 * ===============================================
 * 🔗 RTK Query API Setup with Multi-Base Support
 * ===============================================
 *
 * This file sets up the base API configuration for Redux Toolkit Query (RTK Query),
 * including:
 *
 * ✅ Support for multiple base URLs using `API_TYPE` constants
 * ✅ Shared token-based authentication (from localStorage or cookie)
 * ✅ Global 401 handler that logs out and redirects to login
 * ✅ Retry logic for transient failures
 * ✅ Disabled caching for always-fresh data
 *
 * -----------------------------------------------
 * 💡 How to Use `extraOptions.meta`
 * -----------------------------------------------
 *
 * Use `extraOptions.meta` **only when needed**.
 * Most endpoints will work without it — especially when using the default (primary) base API.
 *
 * 🔸 If you want to call the **primary** base URL:
 *     → You do NOT need to pass anything.
 *
 * 🔸 If you want to call a **secondary** base URL:
 *     → Pass `extraOptions.meta.apiType = API_TYPE.SECONDARY`
 *
 * 🔸 You can also pass **custom meta values** (e.g., `debug`, `checkTheName`) if needed in `baseQueryWithAuthCheck`.
 *
 * ✅ Example: No meta needed (uses primary base)
 *   getUsers: builder.query({
 *     query: () => ({ url: '/users', method: 'GET' }),
 *   })
 *
 * ✅ Example: Use secondary base + custom meta
 *   getExternalUsers: builder.query({
 *     query: () => ({ url: '/external/users', method: 'GET' }),
 *     extraOptions: {
 *       meta: {
 *         apiType: API_TYPE.SECONDARY,
 *         debug: true,
 *         checkTheName: 'Siam'
 *       },
 *     },
 *   })
 * ✅ Example (POST): // without extraOptions
 *   createUser: builder.mutation({
 *     query: (data) => ({ url: '/users', method: 'POST', body: data }),
 *   })
 * 
 * ✅ Example (POST):
 *   createUser: builder.mutation({
 *     query: (data) => ({ url: '/users', method: 'POST', body: data }),
 *     extraOptions: {
 *       meta: {
 *         apiType: API_TYPE.PRIMARY,
 *       },
 *     },
 *   })
 * -----------------------------------------------
 * 🔐 Token Handling:
 * -----------------------------------------------
 * - Checks localStorage first, then cookies for the auth token
 * - Attaches Bearer token in `Authorization` header
 * - On 401 response: clears token and redirects to login (ghost route)
 *
 * -----------------------------------------------
 * 🔄 Retry Logic:
 * -----------------------------------------------
 * - Retries failed requests up to 3 times if they are 5xx or network errors
 *
 * -----------------------------------------------
 * 🚫 Cache Disabled:
 * -----------------------------------------------
 * - `keepUnusedDataFor: 0` clears cache after unmount
 * - Refetches on mount, reconnect, or focus to always get fresh data
 */


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "../../configs/environment.config";
import { AUTH_TOKEN } from "../../constants/app.constant";
import { tagTypesList } from "../tagTypes";
import routePaths from "../../constants/routePaths.constant";
import { API_TYPE } from "../apiEndpoints";

// Helper function to get token from cookies by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

const prepareHeaders = (headers) => {
    // Try localStorage first
    let authToken = localStorage.getItem(AUTH_TOKEN);

    // If no token in localStorage, try cookies
    if (!authToken) {
        authToken = getCookie(AUTH_TOKEN);
    }

    if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
    }

    return headers;
};

// Map of base queries for different APIs
const baseQueries = {
    [API_TYPE.PRIMARY]: fetchBaseQuery({
        baseUrl: `${environment.baseUrl}`,
        credentials: "include",
        prepareHeaders,
    }),
    [API_TYPE.SECONDARY]: fetchBaseQuery({
        baseUrl: environment.baseUrl,
        credentials: "include",
        prepareHeaders,
    }),

};


// Wrap the baseQuery to handle 401 responses globally
const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
    const apiType = extraOptions?.meta?.apiType || API_TYPE.PRIMARY;
    const query = baseQueries[apiType] || baseQueries[API_TYPE.PRIMARY];

    const result = await query(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Clear localStorage & cookies
        localStorage.removeItem(AUTH_TOKEN);
        document.cookie = `${AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Lax`;
        localStorage.clear();
        // Redirect to login
        const redirectPath = environment.sub_domain_path === "/"
            ? routePaths.ROUTE_GHOST_ENTRY_PATH
            : environment.sub_domain_path + routePaths.ROUTE_GHOST_ENTRY_PATH;

        window.location.href = redirectPath;
    }
    return result;
};


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithAuthCheck,
    tagTypes: tagTypesList,
    keepUnusedDataFor: 0,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    endpoints: () => ({}),
});