import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DivisionController::store
* @see app/Http/Controllers/DivisionController.php:10
* @route '/divisions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/divisions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DivisionController::store
* @see app/Http/Controllers/DivisionController.php:10
* @route '/divisions'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DivisionController::store
* @see app/Http/Controllers/DivisionController.php:10
* @route '/divisions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DivisionController::store
* @see app/Http/Controllers/DivisionController.php:10
* @route '/divisions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DivisionController::store
* @see app/Http/Controllers/DivisionController.php:10
* @route '/divisions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DivisionController::destroy
* @see app/Http/Controllers/DivisionController.php:22
* @route '/divisions/{division}'
*/
export const destroy = (args: { division: string | number | { id: string | number } } | [division: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/divisions/{division}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DivisionController::destroy
* @see app/Http/Controllers/DivisionController.php:22
* @route '/divisions/{division}'
*/
destroy.url = (args: { division: string | number | { id: string | number } } | [division: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { division: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { division: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            division: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        division: typeof args.division === 'object'
        ? args.division.id
        : args.division,
    }

    return destroy.definition.url
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DivisionController::destroy
* @see app/Http/Controllers/DivisionController.php:22
* @route '/divisions/{division}'
*/
destroy.delete = (args: { division: string | number | { id: string | number } } | [division: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DivisionController::destroy
* @see app/Http/Controllers/DivisionController.php:22
* @route '/divisions/{division}'
*/
const destroyForm = (args: { division: string | number | { id: string | number } } | [division: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DivisionController::destroy
* @see app/Http/Controllers/DivisionController.php:22
* @route '/divisions/{division}'
*/
destroyForm.delete = (args: { division: string | number | { id: string | number } } | [division: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DivisionController = { store, destroy }

export default DivisionController