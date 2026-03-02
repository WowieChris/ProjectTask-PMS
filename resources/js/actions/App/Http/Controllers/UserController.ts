import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::bulkDelete
* @see app/Http/Controllers/UserController.php:121
* @route '/users/bulk-delete'
*/
export const bulkDelete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

bulkDelete.definition = {
    methods: ["delete"],
    url: '/users/bulk-delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::bulkDelete
* @see app/Http/Controllers/UserController.php:121
* @route '/users/bulk-delete'
*/
bulkDelete.url = (options?: RouteQueryOptions) => {
    return bulkDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::bulkDelete
* @see app/Http/Controllers/UserController.php:121
* @route '/users/bulk-delete'
*/
bulkDelete.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserController::bulkDelete
* @see app/Http/Controllers/UserController.php:121
* @route '/users/bulk-delete'
*/
const bulkDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::bulkDelete
* @see app/Http/Controllers/UserController.php:121
* @route '/users/bulk-delete'
*/
bulkDeleteForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDelete.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

bulkDelete.form = bulkDeleteForm

/**
* @see \App\Http\Controllers\UserController::updateInline
* @see app/Http/Controllers/UserController.php:95
* @route '/users/{user}/inline-update'
*/
export const updateInline = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateInline.url(args, options),
    method: 'patch',
})

updateInline.definition = {
    methods: ["patch"],
    url: '/users/{user}/inline-update',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\UserController::updateInline
* @see app/Http/Controllers/UserController.php:95
* @route '/users/{user}/inline-update'
*/
updateInline.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return updateInline.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::updateInline
* @see app/Http/Controllers/UserController.php:95
* @route '/users/{user}/inline-update'
*/
updateInline.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateInline.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserController::updateInline
* @see app/Http/Controllers/UserController.php:95
* @route '/users/{user}/inline-update'
*/
const updateInlineForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateInline.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::updateInline
* @see app/Http/Controllers/UserController.php:95
* @route '/users/{user}/inline-update'
*/
updateInlineForm.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateInline.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateInline.form = updateInlineForm

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:13
* @route '/users'
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
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/users/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::create
* @see app/Http/Controllers/UserController.php:22
* @route '/users/create'
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
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:27
* @route '/users'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:27
* @route '/users'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:27
* @route '/users'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:27
* @route '/users'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:27
* @route '/users'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
export const edit = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/users/{user}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
edit.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
edit.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
edit.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
const editForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
editForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::edit
* @see app/Http/Controllers/UserController.php:59
* @route '/users/{user}/edit'
*/
editForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
export const update = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/users/{user}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
update.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
update.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
update.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
const updateForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
updateForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::update
* @see app/Http/Controllers/UserController.php:66
* @route '/users/{user}'
*/
updateForm.patch = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:114
* @route '/users/{user}'
*/
export const destroy = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:114
* @route '/users/{user}'
*/
destroy.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:114
* @route '/users/{user}'
*/
destroy.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:114
* @route '/users/{user}'
*/
const destroyForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::destroy
* @see app/Http/Controllers/UserController.php:114
* @route '/users/{user}'
*/
destroyForm.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\UserController::uploadPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
export const uploadPhoto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

uploadPhoto.definition = {
    methods: ["post"],
    url: '/user/photo/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::uploadPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
uploadPhoto.url = (options?: RouteQueryOptions) => {
    return uploadPhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::uploadPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
uploadPhoto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::uploadPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
const uploadPhotoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadPhoto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::uploadPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
uploadPhotoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadPhoto.url(options),
    method: 'post',
})

uploadPhoto.form = uploadPhotoForm

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
export const getPhotos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPhotos.url(options),
    method: 'get',
})

getPhotos.definition = {
    methods: ["get","head"],
    url: '/user/photos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
getPhotos.url = (options?: RouteQueryOptions) => {
    return getPhotos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
getPhotos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPhotos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
getPhotos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPhotos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
const getPhotosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPhotos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
getPhotosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPhotos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::getPhotos
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photos'
*/
getPhotosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPhotos.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getPhotos.form = getPhotosForm

/**
* @see \App\Http\Controllers\UserController::deletePhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
export const deletePhoto = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(args, options),
    method: 'delete',
})

deletePhoto.definition = {
    methods: ["delete"],
    url: '/user/photo/{photo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::deletePhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
deletePhoto.url = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photo: args }
    }

    if (Array.isArray(args)) {
        args = {
            photo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        photo: args.photo,
    }

    return deletePhoto.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::deletePhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
deletePhoto.delete = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserController::deletePhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
const deletePhotoForm = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deletePhoto.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::deletePhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
deletePhotoForm.delete = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deletePhoto.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deletePhoto.form = deletePhotoForm

/**
* @see \App\Http\Controllers\UserController::setCurrentPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
export const setCurrentPhoto = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setCurrentPhoto.url(args, options),
    method: 'post',
})

setCurrentPhoto.definition = {
    methods: ["post"],
    url: '/user/photo/{photo}/set-current',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::setCurrentPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
setCurrentPhoto.url = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photo: args }
    }

    if (Array.isArray(args)) {
        args = {
            photo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        photo: args.photo,
    }

    return setCurrentPhoto.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::setCurrentPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
setCurrentPhoto.post = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setCurrentPhoto.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::setCurrentPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
const setCurrentPhotoForm = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setCurrentPhoto.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::setCurrentPhoto
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
setCurrentPhotoForm.post = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setCurrentPhoto.url(args, options),
    method: 'post',
})

setCurrentPhoto.form = setCurrentPhotoForm

const UserController = { bulkDelete, updateInline, index, create, store, edit, update, destroy, uploadPhoto, getPhotos, deletePhoto, setCurrentPhoto }

export default UserController