import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::store
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:12
* @route '/settings/two-factor/method'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/two-factor/method',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::store
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:12
* @route '/settings/two-factor/method'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::store
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:12
* @route '/settings/two-factor/method'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::store
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:12
* @route '/settings/two-factor/method'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::store
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:12
* @route '/settings/two-factor/method'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::destroy
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:26
* @route '/settings/two-factor/method'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/two-factor/method',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::destroy
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:26
* @route '/settings/two-factor/method'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::destroy
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:26
* @route '/settings/two-factor/method'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::destroy
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:26
* @route '/settings/two-factor/method'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\TwoFactorMethodController::destroy
* @see app/Http/Controllers/Settings/TwoFactorMethodController.php:26
* @route '/settings/two-factor/method'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const method = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default method