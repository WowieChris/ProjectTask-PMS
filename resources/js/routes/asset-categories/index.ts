import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetCategoryController::index
 * @see app/Http/Controllers/AssetCategoryController.php:12
 * @route '/asset-management/asset-categories'
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
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetCategoryController::create
 * @see app/Http/Controllers/AssetCategoryController.php:20
 * @route '/asset-management/asset-categories/create'
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
* @see \App\Http\Controllers\AssetCategoryController::store
 * @see app/Http/Controllers/AssetCategoryController.php:28
 * @route '/asset-management/asset-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/asset-management/asset-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::store
 * @see app/Http/Controllers/AssetCategoryController.php:28
 * @route '/asset-management/asset-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::store
 * @see app/Http/Controllers/AssetCategoryController.php:28
 * @route '/asset-management/asset-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::store
 * @see app/Http/Controllers/AssetCategoryController.php:28
 * @route '/asset-management/asset-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::store
 * @see app/Http/Controllers/AssetCategoryController.php:28
 * @route '/asset-management/asset-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
export const show = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-categories/{asset_category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
show.url = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_category: args.asset_category,
                }

    return show.definition.url
            .replace('{asset_category}', parsedArgs.asset_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
show.get = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
show.head = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
    const showForm = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
        showForm.get = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetCategoryController::show
 * @see app/Http/Controllers/AssetCategoryController.php:36
 * @route '/asset-management/asset-categories/{asset_category}'
 */
        showForm.head = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
export const edit = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/asset-management/asset-categories/{asset_category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
edit.url = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_category: args.asset_category,
                }

    return edit.definition.url
            .replace('{asset_category}', parsedArgs.asset_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
edit.get = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
edit.head = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
    const editForm = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
        editForm.get = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetCategoryController::edit
 * @see app/Http/Controllers/AssetCategoryController.php:44
 * @route '/asset-management/asset-categories/{asset_category}/edit'
 */
        editForm.head = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
export const update = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/asset-management/asset-categories/{asset_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
update.url = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_category: args.asset_category,
                }

    return update.definition.url
            .replace('{asset_category}', parsedArgs.asset_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
update.put = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
update.patch = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
    const updateForm = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
        updateForm.put = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AssetCategoryController::update
 * @see app/Http/Controllers/AssetCategoryController.php:52
 * @route '/asset-management/asset-categories/{asset_category}'
 */
        updateForm.patch = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AssetCategoryController::destroy
 * @see app/Http/Controllers/AssetCategoryController.php:60
 * @route '/asset-management/asset-categories/{asset_category}'
 */
export const destroy = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/asset-management/asset-categories/{asset_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AssetCategoryController::destroy
 * @see app/Http/Controllers/AssetCategoryController.php:60
 * @route '/asset-management/asset-categories/{asset_category}'
 */
destroy.url = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    asset_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset_category: args.asset_category,
                }

    return destroy.definition.url
            .replace('{asset_category}', parsedArgs.asset_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetCategoryController::destroy
 * @see app/Http/Controllers/AssetCategoryController.php:60
 * @route '/asset-management/asset-categories/{asset_category}'
 */
destroy.delete = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AssetCategoryController::destroy
 * @see app/Http/Controllers/AssetCategoryController.php:60
 * @route '/asset-management/asset-categories/{asset_category}'
 */
    const destroyForm = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetCategoryController::destroy
 * @see app/Http/Controllers/AssetCategoryController.php:60
 * @route '/asset-management/asset-categories/{asset_category}'
 */
        destroyForm.delete = (args: { asset_category: string | number } | [asset_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assetCategories = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default assetCategories