import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AreaController::store
* @see app/Http/Controllers/AreaController.php:10
* @route '/areas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/areas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AreaController::store
* @see app/Http/Controllers/AreaController.php:10
* @route '/areas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::store
* @see app/Http/Controllers/AreaController.php:10
* @route '/areas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AreaController::store
* @see app/Http/Controllers/AreaController.php:10
* @route '/areas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AreaController::store
* @see app/Http/Controllers/AreaController.php:10
* @route '/areas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\AreaController::destroy
* @see app/Http/Controllers/AreaController.php:33
* @route '/areas/{area}'
*/
export const destroy = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AreaController::destroy
* @see app/Http/Controllers/AreaController.php:33
* @route '/areas/{area}'
*/
destroy.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { area: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            area: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        area: typeof args.area === 'object'
        ? args.area.id
        : args.area,
    }

    return destroy.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::destroy
* @see app/Http/Controllers/AreaController.php:33
* @route '/areas/{area}'
*/
destroy.delete = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AreaController::destroy
* @see app/Http/Controllers/AreaController.php:33
* @route '/areas/{area}'
*/
const destroyForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AreaController::destroy
* @see app/Http/Controllers/AreaController.php:33
* @route '/areas/{area}'
*/
destroyForm.delete = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const AreaController = { store, destroy }

export default AreaController