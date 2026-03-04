import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DistrictController::index
 * @see app/Http/Controllers/DistrictController.php:12
 * @route '/districts'
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
* @see \App\Http\Controllers\DistrictController::store
 * @see app/Http/Controllers/DistrictController.php:22
 * @route '/districts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/districts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DistrictController::store
 * @see app/Http/Controllers/DistrictController.php:22
 * @route '/districts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::store
 * @see app/Http/Controllers/DistrictController.php:22
 * @route '/districts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DistrictController::store
 * @see app/Http/Controllers/DistrictController.php:22
 * @route '/districts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DistrictController::store
 * @see app/Http/Controllers/DistrictController.php:22
 * @route '/districts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DistrictController::destroy
 * @see app/Http/Controllers/DistrictController.php:34
 * @route '/districts/{district}'
 */
export const destroy = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/districts/{district}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DistrictController::destroy
 * @see app/Http/Controllers/DistrictController.php:34
 * @route '/districts/{district}'
 */
destroy.url = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { district: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { district: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    district: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        district: typeof args.district === 'object'
                ? args.district.id
                : args.district,
                }

    return destroy.definition.url
            .replace('{district}', parsedArgs.district.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DistrictController::destroy
 * @see app/Http/Controllers/DistrictController.php:34
 * @route '/districts/{district}'
 */
destroy.delete = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DistrictController::destroy
 * @see app/Http/Controllers/DistrictController.php:34
 * @route '/districts/{district}'
 */
    const destroyForm = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DistrictController::destroy
 * @see app/Http/Controllers/DistrictController.php:34
 * @route '/districts/{district}'
 */
        destroyForm.delete = (args: { district: number | { id: number } } | [district: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const districts = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default districts