import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-transfers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetTransferController::index
 * @see app/Http/Controllers/AssetTransferController.php:12
 * @route '/asset-management/asset-transfers'
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
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-transfers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetTransferController::create
 * @see app/Http/Controllers/AssetTransferController.php:20
 * @route '/asset-management/asset-transfers/create'
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
* @see \App\Http\Controllers\AssetTransferController::store
 * @see app/Http/Controllers/AssetTransferController.php:28
 * @route '/asset-management/asset-transfers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/asset-management/asset-transfers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetTransferController::store
 * @see app/Http/Controllers/AssetTransferController.php:28
 * @route '/asset-management/asset-transfers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::store
 * @see app/Http/Controllers/AssetTransferController.php:28
 * @route '/asset-management/asset-transfers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::store
 * @see app/Http/Controllers/AssetTransferController.php:28
 * @route '/asset-management/asset-transfers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::store
 * @see app/Http/Controllers/AssetTransferController.php:28
 * @route '/asset-management/asset-transfers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
export const show = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-transfers/{asset_transfer}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
show.url = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_transfer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_transfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_transfer: args.asset_transfer,
                }

    return show.definition.url
            .replace('{asset_transfer}', parsedArgs.asset_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
show.get = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
show.head = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
    const showForm = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
        showForm.get = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetTransferController::show
 * @see app/Http/Controllers/AssetTransferController.php:36
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
        showForm.head = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
export const edit = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-transfers/{asset_transfer}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
edit.url = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_transfer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_transfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_transfer: args.asset_transfer,
                }

    return edit.definition.url
            .replace('{asset_transfer}', parsedArgs.asset_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
edit.get = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
edit.head = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
    const editForm = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
        editForm.get = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetTransferController::edit
 * @see app/Http/Controllers/AssetTransferController.php:44
 * @route '/asset-management/asset-transfers/{asset_transfer}/edit'
 */
        editForm.head = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
export const update = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/asset-management/asset-transfers/{asset_transfer}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
update.url = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_transfer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_transfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_transfer: args.asset_transfer,
                }

    return update.definition.url
            .replace('{asset_transfer}', parsedArgs.asset_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
update.put = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
update.patch = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
    const updateForm = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
        updateForm.put = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AssetTransferController::update
 * @see app/Http/Controllers/AssetTransferController.php:52
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
        updateForm.patch = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AssetTransferController::destroy
 * @see app/Http/Controllers/AssetTransferController.php:60
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
export const destroy = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/asset-management/asset-transfers/{asset_transfer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssetTransferController::destroy
 * @see app/Http/Controllers/AssetTransferController.php:60
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
destroy.url = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_transfer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_transfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_transfer: args.asset_transfer,
                }

    return destroy.definition.url
            .replace('{asset_transfer}', parsedArgs.asset_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetTransferController::destroy
 * @see app/Http/Controllers/AssetTransferController.php:60
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
destroy.delete = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssetTransferController::destroy
 * @see app/Http/Controllers/AssetTransferController.php:60
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
    const destroyForm = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetTransferController::destroy
 * @see app/Http/Controllers/AssetTransferController.php:60
 * @route '/asset-management/asset-transfers/{asset_transfer}'
 */
        destroyForm.delete = (args: { asset_transfer: string | number } | [asset_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AssetTransferController = { index, create, store, show, edit, update, destroy }

export default AssetTransferController