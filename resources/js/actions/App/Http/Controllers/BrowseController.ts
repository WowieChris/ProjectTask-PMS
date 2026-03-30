import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
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
 * @see app/Http/Controllers/BrowseController.php:15
 * @route '/browse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
 * @route '/browse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
 * @route '/browse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
 * @route '/browse'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
 * @route '/browse'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:15
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
/**
* @see \App\Http\Controllers\BrowseController::move
 * @see app/Http/Controllers/BrowseController.php:25
 * @route '/browse/move'
 */
export const move = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

move.definition = {
    methods: ["patch"],
    url: '/browse/move',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\BrowseController::move
 * @see app/Http/Controllers/BrowseController.php:25
 * @route '/browse/move'
 */
move.url = (options?: RouteQueryOptions) => {
    return move.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrowseController::move
 * @see app/Http/Controllers/BrowseController.php:25
 * @route '/browse/move'
 */
move.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\BrowseController::move
 * @see app/Http/Controllers/BrowseController.php:25
 * @route '/browse/move'
 */
    const moveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BrowseController::move
 * @see app/Http/Controllers/BrowseController.php:25
 * @route '/browse/move'
 */
        moveForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    move.form = moveForm
const BrowseController = { index, move }

export default BrowseController