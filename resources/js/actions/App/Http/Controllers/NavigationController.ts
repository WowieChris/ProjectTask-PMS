import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:74
 * @route '/navigation/move'
 */
export const move = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

move.definition = {
    methods: ["patch"],
    url: '/navigation/move',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:74
 * @route '/navigation/move'
 */
move.url = (options?: RouteQueryOptions) => {
    return move.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:74
 * @route '/navigation/move'
 */
move.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:74
 * @route '/navigation/move'
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
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:74
 * @route '/navigation/move'
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
/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ConfigFiles/Navigation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:29
 * @route '/ConfigFiles/Navigation'
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
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:94
 * @route '/ConfigFiles/Navigation'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Navigation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:94
 * @route '/ConfigFiles/Navigation'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:94
 * @route '/ConfigFiles/Navigation'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:94
 * @route '/ConfigFiles/Navigation'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:94
 * @route '/ConfigFiles/Navigation'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const NavigationController = { move, index, store }

export default NavigationController