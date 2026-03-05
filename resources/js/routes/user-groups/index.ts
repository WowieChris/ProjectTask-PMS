import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user-groups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::index
* @see app/Http/Controllers/UserGroupController.php:14
* @route '/user-groups'
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
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
export const show = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user-groups/{userGroup}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
show.url = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userGroup: args }
    }

    if (Array.isArray(args)) {
        args = {
            userGroup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userGroup: args.userGroup,
    }

    return show.definition.url
            .replace('{userGroup}', parsedArgs.userGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
show.get = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
show.head = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
const showForm = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
showForm.get = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserGroupController::show
* @see app/Http/Controllers/UserGroupController.php:0
* @route '/user-groups/{userGroup}'
*/
showForm.head = (args: { userGroup: string | number } | [userGroup: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UserGroupController::store
* @see app/Http/Controllers/UserGroupController.php:47
* @route '/user-groups'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user-groups',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserGroupController::store
* @see app/Http/Controllers/UserGroupController.php:47
* @route '/user-groups'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserGroupController::store
* @see app/Http/Controllers/UserGroupController.php:47
* @route '/user-groups'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserGroupController::store
* @see app/Http/Controllers/UserGroupController.php:47
* @route '/user-groups'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserGroupController::store
* @see app/Http/Controllers/UserGroupController.php:47
* @route '/user-groups'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UserGroupController::destroy
* @see app/Http/Controllers/UserGroupController.php:58
* @route '/user-groups/{userGroup}'
*/
export const destroy = (args: { userGroup: number | { id: number } } | [userGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user-groups/{userGroup}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserGroupController::destroy
* @see app/Http/Controllers/UserGroupController.php:58
* @route '/user-groups/{userGroup}'
*/
destroy.url = (args: { userGroup: number | { id: number } } | [userGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userGroup: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { userGroup: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            userGroup: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userGroup: typeof args.userGroup === 'object'
        ? args.userGroup.id
        : args.userGroup,
    }

    return destroy.definition.url
            .replace('{userGroup}', parsedArgs.userGroup.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserGroupController::destroy
* @see app/Http/Controllers/UserGroupController.php:58
* @route '/user-groups/{userGroup}'
*/
destroy.delete = (args: { userGroup: number | { id: number } } | [userGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserGroupController::destroy
* @see app/Http/Controllers/UserGroupController.php:58
* @route '/user-groups/{userGroup}'
*/
const destroyForm = (args: { userGroup: number | { id: number } } | [userGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserGroupController::destroy
* @see app/Http/Controllers/UserGroupController.php:58
* @route '/user-groups/{userGroup}'
*/
destroyForm.delete = (args: { userGroup: number | { id: number } } | [userGroup: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const userGroups = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default userGroups