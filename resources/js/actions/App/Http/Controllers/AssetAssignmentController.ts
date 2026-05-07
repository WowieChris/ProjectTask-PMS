import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetAssignmentController::index
 * @see app/Http/Controllers/AssetAssignmentController.php:12
 * @route '/asset-management/asset-assignments'
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
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-assignments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetAssignmentController::create
 * @see app/Http/Controllers/AssetAssignmentController.php:20
 * @route '/asset-management/asset-assignments/create'
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
* @see \App\Http\Controllers\AssetAssignmentController::store
 * @see app/Http/Controllers/AssetAssignmentController.php:28
 * @route '/asset-management/asset-assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/asset-management/asset-assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::store
 * @see app/Http/Controllers/AssetAssignmentController.php:28
 * @route '/asset-management/asset-assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::store
 * @see app/Http/Controllers/AssetAssignmentController.php:28
 * @route '/asset-management/asset-assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::store
 * @see app/Http/Controllers/AssetAssignmentController.php:28
 * @route '/asset-management/asset-assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::store
 * @see app/Http/Controllers/AssetAssignmentController.php:28
 * @route '/asset-management/asset-assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
export const show = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-assignments/{asset_assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
show.url = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_assignment: args.asset_assignment,
                }

    return show.definition.url
            .replace('{asset_assignment}', parsedArgs.asset_assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
show.get = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
show.head = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
    const showForm = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
        showForm.get = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetAssignmentController::show
 * @see app/Http/Controllers/AssetAssignmentController.php:36
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
        showForm.head = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
export const edit = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-assignments/{asset_assignment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
edit.url = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_assignment: args.asset_assignment,
                }

    return edit.definition.url
            .replace('{asset_assignment}', parsedArgs.asset_assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
edit.get = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
edit.head = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
    const editForm = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
        editForm.get = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetAssignmentController::edit
 * @see app/Http/Controllers/AssetAssignmentController.php:44
 * @route '/asset-management/asset-assignments/{asset_assignment}/edit'
 */
        editForm.head = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
export const update = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/asset-management/asset-assignments/{asset_assignment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
update.url = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_assignment: args.asset_assignment,
                }

    return update.definition.url
            .replace('{asset_assignment}', parsedArgs.asset_assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
update.put = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
update.patch = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
    const updateForm = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
        updateForm.put = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AssetAssignmentController::update
 * @see app/Http/Controllers/AssetAssignmentController.php:52
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
        updateForm.patch = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AssetAssignmentController::destroy
 * @see app/Http/Controllers/AssetAssignmentController.php:60
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
export const destroy = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/asset-management/asset-assignments/{asset_assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssetAssignmentController::destroy
 * @see app/Http/Controllers/AssetAssignmentController.php:60
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
destroy.url = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_assignment: args.asset_assignment,
                }

    return destroy.definition.url
            .replace('{asset_assignment}', parsedArgs.asset_assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetAssignmentController::destroy
 * @see app/Http/Controllers/AssetAssignmentController.php:60
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
destroy.delete = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssetAssignmentController::destroy
 * @see app/Http/Controllers/AssetAssignmentController.php:60
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
    const destroyForm = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetAssignmentController::destroy
 * @see app/Http/Controllers/AssetAssignmentController.php:60
 * @route '/asset-management/asset-assignments/{asset_assignment}'
 */
        destroyForm.delete = (args: { asset_assignment: string | number } | [asset_assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AssetAssignmentController = { index, create, store, show, edit, update, destroy }

export default AssetAssignmentController