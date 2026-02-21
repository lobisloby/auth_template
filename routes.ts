/**
 * An array of routes that are accessible to the public
 * These routes do not require authnetication 
 * @type{string[]}
 */

export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used for authnetication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
*/

export const authRoutes = [
    "/auth/login",
    "/auth/register"
]; 

/**
 * The prefix for API authnetication routes
 * Routes that start with this prefix are used for API
 * @type{string}
*/

export const apiAuthPrefix = "/api/auth";  


/**
 * The default redirect path after login in
 * @type{string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings" ;   
