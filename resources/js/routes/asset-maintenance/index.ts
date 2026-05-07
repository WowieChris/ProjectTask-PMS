import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetMaintenanceController::index
 * @see app/Http/Controllers/AssetMaintenanceController.php:12
 * @route '/asset-management/asset-maintenance'
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
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-maintenance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetMaintenanceController::create
 * @see app/Http/Controllers/AssetMaintenanceController.php:20
 * @route '/asset-management/asset-maintenance/create'
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
* @see \App\Http\Controllers\AssetMaintenanceController::store
 * @see app/Http/Controllers/AssetMaintenanceController.php:28
 * @route '/asset-management/asset-maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/asset-management/asset-maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::store
 * @see app/Http/Controllers/AssetMaintenanceController.php:28
 * @route '/asset-management/asset-maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::store
 * @see app/Http/Controllers/AssetMaintenanceController.php:28
 * @route '/asset-management/asset-maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::store
 * @see app/Http/Controllers/AssetMaintenanceController.php:28
 * @route '/asset-management/asset-maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::store
 * @see app/Http/Controllers/AssetMaintenanceController.php:28
 * @route '/asset-management/asset-maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
export const show = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-maintenance/{asset_maintenance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
show.url = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_maintenance: args.asset_maintenance,
                }

    return show.definition.url
            .replace('{asset_maintenance}', parsedArgs.asset_maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
show.get = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
show.head = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
    const showForm = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
        showForm.get = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetMaintenanceController::show
 * @see app/Http/Controllers/AssetMaintenanceController.php:36
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
        showForm.head = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
export const edit = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-maintenance/{asset_maintenance}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
edit.url = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_maintenance: args.asset_maintenance,
                }

    return edit.definition.url
            .replace('{asset_maintenance}', parsedArgs.asset_maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
edit.get = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
edit.head = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
    const editForm = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
        editForm.get = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetMaintenanceController::edit
 * @see app/Http/Controllers/AssetMaintenanceController.php:44
 * @route '/asset-management/asset-maintenance/{asset_maintenance}/edit'
 */
        editForm.head = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
export const update = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/asset-management/asset-maintenance/{asset_maintenance}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
update.url = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_maintenance: args.asset_maintenance,
                }

    return update.definition.url
            .replace('{asset_maintenance}', parsedArgs.asset_maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
update.put = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
update.patch = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
    const updateForm = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
        updateForm.put = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AssetMaintenanceController::update
 * @see app/Http/Controllers/AssetMaintenanceController.php:52
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
        updateForm.patch = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AssetMaintenanceController::destroy
 * @see app/Http/Controllers/AssetMaintenanceController.php:60
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
export const destroy = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/asset-management/asset-maintenance/{asset_maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssetMaintenanceController::destroy
 * @see app/Http/Controllers/AssetMaintenanceController.php:60
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
destroy.url = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_maintenance: args.asset_maintenance,
                }

    return destroy.definition.url
            .replace('{asset_maintenance}', parsedArgs.asset_maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetMaintenanceController::destroy
 * @see app/Http/Controllers/AssetMaintenanceController.php:60
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
destroy.delete = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssetMaintenanceController::destroy
 * @see app/Http/Controllers/AssetMaintenanceController.php:60
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
    const destroyForm = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetMaintenanceController::destroy
 * @see app/Http/Controllers/AssetMaintenanceController.php:60
 * @route '/asset-management/asset-maintenance/{asset_maintenance}'
 */
        destroyForm.delete = (args: { asset_maintenance: string | number } | [asset_maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assetMaintenance = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default assetMaintenance