import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mylocation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MyLocationController::index
 * @see app/Http/Controllers/MyLocationController.php:13
 * @route '/mylocation'
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
const MyLocationController = { index }

export default MyLocationController