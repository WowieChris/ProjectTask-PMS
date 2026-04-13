import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/EAMonitoring/Request',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EARequestController::index
 * @see app/Http/Controllers/EARequestController.php:12
 * @route '/EAMonitoring/Request'
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
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/EAMonitoring/Request/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EARequestController::create
 * @see app/Http/Controllers/EARequestController.php:45
 * @route '/EAMonitoring/Request/create'
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
* @see \App\Http\Controllers\EARequestController::store
 * @see app/Http/Controllers/EARequestController.php:51
 * @route '/EAMonitoring/Request'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/EAMonitoring/Request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EARequestController::store
 * @see app/Http/Controllers/EARequestController.php:51
 * @route '/EAMonitoring/Request'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EARequestController::store
 * @see app/Http/Controllers/EARequestController.php:51
 * @route '/EAMonitoring/Request'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EARequestController::store
 * @see app/Http/Controllers/EARequestController.php:51
 * @route '/EAMonitoring/Request'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EARequestController::store
 * @see app/Http/Controllers/EARequestController.php:51
 * @route '/EAMonitoring/Request'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EARequestController::destroy
 * @see app/Http/Controllers/EARequestController.php:76
 * @route '/EAMonitoring/Request/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/EAMonitoring/Request/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EARequestController::destroy
 * @see app/Http/Controllers/EARequestController.php:76
 * @route '/EAMonitoring/Request/{id}'
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
* @see \App\Http\Controllers\EARequestController::destroy
 * @see app/Http/Controllers/EARequestController.php:76
 * @route '/EAMonitoring/Request/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\EARequestController::destroy
 * @see app/Http/Controllers/EARequestController.php:76
 * @route '/EAMonitoring/Request/{id}'
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
* @see \App\Http\Controllers\EARequestController::destroy
 * @see app/Http/Controllers/EARequestController.php:76
 * @route '/EAMonitoring/Request/{id}'
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
/**
* @see \App\Http\Controllers\EARequestController::bulk
 * @see app/Http/Controllers/EARequestController.php:85
 * @route '/EAMonitoring/Request/bulk-update'
 */
export const bulk = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(options),
    method: 'post',
})

bulk.definition = {
    methods: ["post"],
    url: '/EAMonitoring/Request/bulk-update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EARequestController::bulk
 * @see app/Http/Controllers/EARequestController.php:85
 * @route '/EAMonitoring/Request/bulk-update'
 */
bulk.url = (options?: RouteQueryOptions) => {
    return bulk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EARequestController::bulk
 * @see app/Http/Controllers/EARequestController.php:85
 * @route '/EAMonitoring/Request/bulk-update'
 */
bulk.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulk.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EARequestController::bulk
 * @see app/Http/Controllers/EARequestController.php:85
 * @route '/EAMonitoring/Request/bulk-update'
 */
    const bulkForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulk.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EARequestController::bulk
 * @see app/Http/Controllers/EARequestController.php:85
 * @route '/EAMonitoring/Request/bulk-update'
 */
        bulkForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulk.url(options),
            method: 'post',
        })
    
    bulk.form = bulkForm
const request = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
bulk: Object.assign(bulk, bulk),
}

export default request