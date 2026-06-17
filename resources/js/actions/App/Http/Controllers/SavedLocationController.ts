import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/saved-locations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SavedLocationController::index
 * @see app/Http/Controllers/SavedLocationController.php:11
 * @route '/saved-locations'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SavedLocationController::store
 * @see app/Http/Controllers/SavedLocationController.php:18
 * @route '/saved-locations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/saved-locations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SavedLocationController::store
 * @see app/Http/Controllers/SavedLocationController.php:18
 * @route '/saved-locations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SavedLocationController::store
 * @see app/Http/Controllers/SavedLocationController.php:18
 * @route '/saved-locations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SavedLocationController::store
 * @see app/Http/Controllers/SavedLocationController.php:18
 * @route '/saved-locations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SavedLocationController::store
 * @see app/Http/Controllers/SavedLocationController.php:18
 * @route '/saved-locations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SavedLocationController::destroy
 * @see app/Http/Controllers/SavedLocationController.php:34
 * @route '/saved-locations/{savedLocation}'
 */
export const destroy = (args: { savedLocation: string | number | { id: string | number } } | [savedLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/saved-locations/{savedLocation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SavedLocationController::destroy
 * @see app/Http/Controllers/SavedLocationController.php:34
 * @route '/saved-locations/{savedLocation}'
 */
destroy.url = (args: { savedLocation: string | number | { id: string | number } } | [savedLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { savedLocation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { savedLocation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    savedLocation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        savedLocation: typeof args.savedLocation === 'object'
                ? args.savedLocation.id
                : args.savedLocation,
                }

    return destroy.definition.url
            .replace('{savedLocation}', parsedArgs.savedLocation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SavedLocationController::destroy
 * @see app/Http/Controllers/SavedLocationController.php:34
 * @route '/saved-locations/{savedLocation}'
 */
destroy.delete = (args: { savedLocation: string | number | { id: string | number } } | [savedLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SavedLocationController::destroy
 * @see app/Http/Controllers/SavedLocationController.php:34
 * @route '/saved-locations/{savedLocation}'
 */
    const destroyForm = (args: { savedLocation: string | number | { id: string | number } } | [savedLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SavedLocationController::destroy
 * @see app/Http/Controllers/SavedLocationController.php:34
 * @route '/saved-locations/{savedLocation}'
 */
        destroyForm.delete = (args: { savedLocation: string | number | { id: string | number } } | [savedLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SavedLocationController = { index, store, destroy }

export default SavedLocationController