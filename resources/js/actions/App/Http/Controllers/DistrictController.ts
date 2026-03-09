import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:15
* @route '/districts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/districts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:15
* @route '/districts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:15
* @route '/districts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:15
* @route '/districts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DistrictController::store
* @see app/Http/Controllers/DistrictController.php:15
* @route '/districts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DistrictController::destroy
* @see app/Http/Controllers/DistrictController.php:35
* @route '/districts/{district}'
*/
export const destroy = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/districts/{district}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DistrictController::destroy
* @see app/Http/Controllers/DistrictController.php:35
* @route '/districts/{district}'
*/
destroy.url = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { district: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { district: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            district: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        district: typeof args.district === 'object'
        ? args.district.id
        : args.district,
    }

    return destroy.definition.url
            .replace('{district}', parsedArgs.district.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::destroy
* @see app/Http/Controllers/DistrictController.php:35
* @route '/districts/{district}'
*/
destroy.delete = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DistrictController::destroy
* @see app/Http/Controllers/DistrictController.php:35
* @route '/districts/{district}'
*/
const destroyForm = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DistrictController::destroy
* @see app/Http/Controllers/DistrictController.php:35
* @route '/districts/{district}'
*/
destroyForm.delete = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DistrictController = { store, destroy }

export default DistrictController