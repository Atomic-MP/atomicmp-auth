# AtomicMP Auth
An authentication server for a Fallout-like MMO.

Check us out at [our website](https://www.atomicmp.com/)

## Navigating the Source Code

All source code can be found in the `/src` directory.

### `helpers`
These are simple funcitons, used in more than one location.

All helpers can be destructured directly from the `helpers` directory.

Helpers should be rigidly tested in the `__tests__` subdirectory.

### `middlewares`
Middlewares used in routing.

These can be used for authentication, authorization, or error handling.

### `models`
`interface`'s and `class`es used in multiple locations.

Avoid extending the classes unless the method is needed in multiple locations. Doing so unneccessarily will result in long-term performance issues.

### `routes`
The endpoint definitions of the Express server.

When creating an endpoint that branches out (ex. `/user/1`, `/user/1/inventory` & `/user/1/location`), create a new directory with an `index.ts` file that bundles all required routes, and import it higher up using the `router.use()` method.

### `scripts`
Quick and dirty scripts for db management or analytics.

### `services`
Libraries that require a good deal of initialization in order to work properly. (ex. database connection)

Initializing these once and importing them elsewhere is more efficient.

### `utils`
A catch-all for abstractions that don't belong anywhere more specific.

ex: constants and fixtures
