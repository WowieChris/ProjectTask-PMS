import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/geomap-branches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::index
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:13
 * @route '/geomap-branches'
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
* @see \App\Http\Controllers\Api\GeoMapBranchController::store
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:32
 * @route '/geomap-branches'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/geomap-branches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::store
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:32
 * @route '/geomap-branches'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::store
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:32
 * @route '/geomap-branches'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::store
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:32
 * @route '/geomap-branches'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::store
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:32
 * @route '/geomap-branches'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
export const show = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/geomap-branches/{geomap_branch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
show.url = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { geomap_branch: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    geomap_branch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        geomap_branch: args.geomap_branch,
                }

    return show.definition.url
            .replace('{geomap_branch}', parsedArgs.geomap_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
show.get = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
show.head = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
    const showForm = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
        showForm.get = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::show
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:46
 * @route '/geomap-branches/{geomap_branch}'
 */
        showForm.head = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
export const update = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/geomap-branches/{geomap_branch}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
update.url = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { geomap_branch: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    geomap_branch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        geomap_branch: args.geomap_branch,
                }

    return update.definition.url
            .replace('{geomap_branch}', parsedArgs.geomap_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
update.put = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
update.patch = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
    const updateForm = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
        updateForm.put = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::update
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:51
 * @route '/geomap-branches/{geomap_branch}'
 */
        updateForm.patch = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::destroy
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:67
 * @route '/geomap-branches/{geomap_branch}'
 */
export const destroy = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/geomap-branches/{geomap_branch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::destroy
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:67
 * @route '/geomap-branches/{geomap_branch}'
 */
destroy.url = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { geomap_branch: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    geomap_branch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        geomap_branch: args.geomap_branch,
                }

    return destroy.definition.url
            .replace('{geomap_branch}', parsedArgs.geomap_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeoMapBranchController::destroy
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:67
 * @route '/geomap-branches/{geomap_branch}'
 */
destroy.delete = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::destroy
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:67
 * @route '/geomap-branches/{geomap_branch}'
 */
    const destroyForm = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\GeoMapBranchController::destroy
 * @see app/Http/Controllers/Api/GeoMapBranchController.php:67
 * @route '/geomap-branches/{geomap_branch}'
 */
        destroyForm.delete = (args: { geomap_branch: string | number } | [geomap_branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const geomapBranches = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default geomapBranches