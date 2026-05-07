import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/areas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AreaController::index
 * @see app/Http/Controllers/AreaController.php:12
 * @route '/areas'
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
* @see \App\Http\Controllers\AreaController::store
 * @see app/Http/Controllers/AreaController.php:20
 * @route '/areas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/areas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AreaController::store
 * @see app/Http/Controllers/AreaController.php:20
 * @route '/areas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::store
 * @see app/Http/Controllers/AreaController.php:20
 * @route '/areas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AreaController::store
 * @see app/Http/Controllers/AreaController.php:20
 * @route '/areas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AreaController::store
 * @see app/Http/Controllers/AreaController.php:20
 * @route '/areas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
export const show = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
show.url = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: args.area,
                }

    return show.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
show.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
show.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
    const showForm = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
        showForm.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AreaController::show
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}'
 */
        showForm.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/{area}'
 */
export const update = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/{area}'
 */
update.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { area: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: typeof args.area === 'object'
                ? args.area.id
                : args.area,
                }

    return update.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/{area}'
 */
update.put = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/{area}'
 */
    const updateForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/{area}'
 */
        updateForm.put = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:50
 * @route '/areas/{area}'
 */
export const destroy = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:50
 * @route '/areas/{area}'
 */
destroy.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { area: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: typeof args.area === 'object'
                ? args.area.id
                : args.area,
                }

    return destroy.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:50
 * @route '/areas/{area}'
 */
destroy.delete = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:50
 * @route '/areas/{area}'
 */
    const destroyForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:50
 * @route '/areas/{area}'
 */
        destroyForm.delete = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const areas = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default areas