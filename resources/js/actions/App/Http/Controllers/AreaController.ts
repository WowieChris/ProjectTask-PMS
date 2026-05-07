import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/update'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/areas/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/update'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/update'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/update'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AreaController::update
 * @see app/Http/Controllers/AreaController.php:35
 * @route '/areas/update'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
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
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
export const division = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: division.url(args, options),
    method: 'get',
})

division.definition = {
    methods: ["get","head"],
    url: '/areas/{area}/divisions/{division}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.url = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                    division: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: args.area,
                                division: args.division,
                }

    return division.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: division.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: division.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
    const divisionForm = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: division.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
        divisionForm.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: division.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AreaController::division
 * @see app/Http/Controllers/AreaController.php:0
 * @route '/areas/{area}/divisions/{division}'
 */
        divisionForm.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: division.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    division.form = divisionForm
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
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:54
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
 * @see app/Http/Controllers/AreaController.php:54
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
 * @see app/Http/Controllers/AreaController.php:54
 * @route '/areas/{area}'
 */
destroy.delete = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AreaController::destroy
 * @see app/Http/Controllers/AreaController.php:54
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
 * @see app/Http/Controllers/AreaController.php:54
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
const AreaController = { index, update, show, division, store, destroy }

export default AreaController