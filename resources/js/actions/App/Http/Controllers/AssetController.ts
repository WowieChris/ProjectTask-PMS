import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/assets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:13
 * @route '/asset-management/assets'
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
const AssetController = { index }

export default AssetController