import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/browse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:10
 * @route '/browse'
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
const browse = {
    index: Object.assign(index, index),
}

export default browse