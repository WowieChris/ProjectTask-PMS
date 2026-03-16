import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
const index91064dd7859b535f70c57dcb832bd1b9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index91064dd7859b535f70c57dcb832bd1b9.url(options),
    method: 'get',
})

index91064dd7859b535f70c57dcb832bd1b9.definition = {
    methods: ["get","head"],
    url: '/branches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
index91064dd7859b535f70c57dcb832bd1b9.url = (options?: RouteQueryOptions) => {
    return index91064dd7859b535f70c57dcb832bd1b9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
index91064dd7859b535f70c57dcb832bd1b9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index91064dd7859b535f70c57dcb832bd1b9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
index91064dd7859b535f70c57dcb832bd1b9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index91064dd7859b535f70c57dcb832bd1b9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
    const index91064dd7859b535f70c57dcb832bd1b9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index91064dd7859b535f70c57dcb832bd1b9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
        index91064dd7859b535f70c57dcb832bd1b9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index91064dd7859b535f70c57dcb832bd1b9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/branches'
 */
        index91064dd7859b535f70c57dcb832bd1b9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index91064dd7859b535f70c57dcb832bd1b9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index91064dd7859b535f70c57dcb832bd1b9.form = index91064dd7859b535f70c57dcb832bd1b9Form
    /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
const index6caa4292381479b46586a55074b9e86e = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6caa4292381479b46586a55074b9e86e.url(args, options),
    method: 'get',
})

index6caa4292381479b46586a55074b9e86e.definition = {
    methods: ["get","head"],
    url: '/areas/{area}/branches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
index6caa4292381479b46586a55074b9e86e.url = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index6caa4292381479b46586a55074b9e86e.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
index6caa4292381479b46586a55074b9e86e.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6caa4292381479b46586a55074b9e86e.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
index6caa4292381479b46586a55074b9e86e.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6caa4292381479b46586a55074b9e86e.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
    const index6caa4292381479b46586a55074b9e86eForm = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index6caa4292381479b46586a55074b9e86e.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
        index6caa4292381479b46586a55074b9e86eForm.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index6caa4292381479b46586a55074b9e86e.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BranchController::index
 * @see app/Http/Controllers/BranchController.php:14
 * @route '/areas/{area}/branches'
 */
        index6caa4292381479b46586a55074b9e86eForm.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index6caa4292381479b46586a55074b9e86e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index6caa4292381479b46586a55074b9e86e.form = index6caa4292381479b46586a55074b9e86eForm

export const index = {
    '/branches': index91064dd7859b535f70c57dcb832bd1b9,
    '/areas/{area}/branches': index6caa4292381479b46586a55074b9e86e,
}

/**
* @see \App\Http\Controllers\BranchController::store
 * @see app/Http/Controllers/BranchController.php:28
 * @route '/branches'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/branches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BranchController::store
 * @see app/Http/Controllers/BranchController.php:28
 * @route '/branches'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BranchController::store
 * @see app/Http/Controllers/BranchController.php:28
 * @route '/branches'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BranchController::store
 * @see app/Http/Controllers/BranchController.php:28
 * @route '/branches'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BranchController::store
 * @see app/Http/Controllers/BranchController.php:28
 * @route '/branches'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BranchController::destroy
 * @see app/Http/Controllers/BranchController.php:47
 * @route '/branches/{branch}'
 */
export const destroy = (args: { branch: string | number } | [branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/branches/{branch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BranchController::destroy
 * @see app/Http/Controllers/BranchController.php:47
 * @route '/branches/{branch}'
 */
destroy.url = (args: { branch: string | number } | [branch: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { branch: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    branch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        branch: args.branch,
                }

    return destroy.definition.url
            .replace('{branch}', parsedArgs.branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BranchController::destroy
 * @see app/Http/Controllers/BranchController.php:47
 * @route '/branches/{branch}'
 */
destroy.delete = (args: { branch: string | number } | [branch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BranchController::destroy
 * @see app/Http/Controllers/BranchController.php:47
 * @route '/branches/{branch}'
 */
    const destroyForm = (args: { branch: string | number } | [branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BranchController::destroy
 * @see app/Http/Controllers/BranchController.php:47
 * @route '/branches/{branch}'
 */
        destroyForm.delete = (args: { branch: string | number } | [branch: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const BranchController = { index, store, destroy }

export default BranchController