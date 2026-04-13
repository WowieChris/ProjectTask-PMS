import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/EAMonitoring/HVA',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EAHVAController::index
 * @see app/Http/Controllers/EAHVAController.php:10
 * @route '/EAMonitoring/HVA'
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
* @see \App\Http\Controllers\EAHVAController::store
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/EAMonitoring/HVA',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EAHVAController::store
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EAHVAController::store
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EAHVAController::store
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EAHVAController::store
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EAHVAController::destroy
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/EAMonitoring/HVA/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EAHVAController::destroy
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA/{id}'
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
* @see \App\Http\Controllers\EAHVAController::destroy
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\EAHVAController::destroy
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA/{id}'
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
* @see \App\Http\Controllers\EAHVAController::destroy
 * @see app/Http/Controllers/EAHVAController.php:0
 * @route '/EAMonitoring/HVA/{id}'
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
const hva = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default hva