import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/service-order',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:11
 * @route '/service-order'
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
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/service-order/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceOrderController::create
 * @see app/Http/Controllers/ServiceOrderController.php:0
 * @route '/service-order/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:20
 * @route '/service-order'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/service-order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:20
 * @route '/service-order'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:20
 * @route '/service-order'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:20
 * @route '/service-order'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:20
 * @route '/service-order'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ServiceOrderController = { index, create, store }

export default ServiceOrderController