import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetLogController::index
 * @see app/Http/Controllers/AssetLogController.php:12
 * @route '/asset-management/asset-logs'
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
const assetLogs = {
    index: Object.assign(index, index),
}

export default assetLogs