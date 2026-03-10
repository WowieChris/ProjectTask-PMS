import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/designations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::index
* @see app/Http/Controllers/DesignationsController.php:15
* @route '/designations'
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
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/designations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::create
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/create'
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
* @see \App\Http\Controllers\DesignationsController::store
* @see app/Http/Controllers/DesignationsController.php:27
* @route '/designations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/designations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DesignationsController::store
* @see app/Http/Controllers/DesignationsController.php:27
* @route '/designations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::store
* @see app/Http/Controllers/DesignationsController.php:27
* @route '/designations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DesignationsController::store
* @see app/Http/Controllers/DesignationsController.php:27
* @route '/designations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DesignationsController::store
* @see app/Http/Controllers/DesignationsController.php:27
* @route '/designations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
export const show = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/designations/{designation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
show.url = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { designation: args }
    }

    if (Array.isArray(args)) {
        args = {
            designation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        designation: args.designation,
    }

    return show.definition.url
            .replace('{designation}', parsedArgs.designation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
show.get = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
show.head = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
const showForm = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
showForm.get = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::show
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}'
*/
showForm.head = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
export const edit = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/designations/{designation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
edit.url = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { designation: args }
    }

    if (Array.isArray(args)) {
        args = {
            designation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        designation: args.designation,
    }

    return edit.definition.url
            .replace('{designation}', parsedArgs.designation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
edit.get = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
edit.head = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
const editForm = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
editForm.get = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DesignationsController::edit
* @see app/Http/Controllers/DesignationsController.php:0
* @route '/designations/{designation}/edit'
*/
editForm.head = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
export const update = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/designations/{designation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
update.url = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { designation: args }
    }

    if (Array.isArray(args)) {
        args = {
            designation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        designation: args.designation,
    }

    return update.definition.url
            .replace('{designation}', parsedArgs.designation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
update.put = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
update.patch = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
const updateForm = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
updateForm.put = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DesignationsController::update
* @see app/Http/Controllers/DesignationsController.php:42
* @route '/designations/{designation}'
*/
updateForm.patch = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DesignationsController::destroy
* @see app/Http/Controllers/DesignationsController.php:59
* @route '/designations/{designation}'
*/
export const destroy = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/designations/{designation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DesignationsController::destroy
* @see app/Http/Controllers/DesignationsController.php:59
* @route '/designations/{designation}'
*/
destroy.url = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { designation: args }
    }

    if (Array.isArray(args)) {
        args = {
            designation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        designation: args.designation,
    }

    return destroy.definition.url
            .replace('{designation}', parsedArgs.designation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DesignationsController::destroy
* @see app/Http/Controllers/DesignationsController.php:59
* @route '/designations/{designation}'
*/
destroy.delete = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DesignationsController::destroy
* @see app/Http/Controllers/DesignationsController.php:59
* @route '/designations/{designation}'
*/
const destroyForm = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DesignationsController::destroy
* @see app/Http/Controllers/DesignationsController.php:59
* @route '/designations/{designation}'
*/
destroyForm.delete = (args: { designation: string | number } | [designation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DesignationsController = { index, create, store, show, edit, update, destroy }

export default DesignationsController