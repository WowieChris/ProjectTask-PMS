import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
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
 * @see app/Http/Controllers/ServiceOrderController.php:13
 * @route '/service-order'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
 * @route '/service-order'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
 * @route '/service-order'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
 * @route '/service-order'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
 * @route '/service-order'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceOrderController::index
 * @see app/Http/Controllers/ServiceOrderController.php:13
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
 * @see app/Http/Controllers/ServiceOrderController.php:23
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
 * @see app/Http/Controllers/ServiceOrderController.php:23
 * @route '/service-order'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:23
 * @route '/service-order'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:23
 * @route '/service-order'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::store
 * @see app/Http/Controllers/ServiceOrderController.php:23
 * @route '/service-order'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServiceOrderController::destroy
 * @see app/Http/Controllers/ServiceOrderController.php:54
 * @route '/service-order/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/service-order/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceOrderController::destroy
 * @see app/Http/Controllers/ServiceOrderController.php:54
 * @route '/service-order/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceOrderController::destroy
 * @see app/Http/Controllers/ServiceOrderController.php:54
 * @route '/service-order/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceOrderController::destroy
 * @see app/Http/Controllers/ServiceOrderController.php:54
 * @route '/service-order/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceOrderController::destroy
 * @see app/Http/Controllers/ServiceOrderController.php:54
 * @route '/service-order/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ServiceOrderController = { index, create, store, destroy }

export default ServiceOrderController