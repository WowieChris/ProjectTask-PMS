import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::upload
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/user/photo/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::upload
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::upload
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/upload'
*/
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::deleteMethod
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
export const deleteMethod = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/user/photo/{photo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::deleteMethod
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
deleteMethod.url = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::deleteMethod
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}'
*/
deleteMethod.delete = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserController::setCurrent
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
export const setCurrent = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setCurrent.url(args, options),
    method: 'post',
})

setCurrent.definition = {
    methods: ["post"],
    url: '/user/photo/{photo}/set-current',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::setCurrent
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
setCurrent.url = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return setCurrent.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::setCurrent
* @see app/Http/Controllers/UserController.php:0
* @route '/user/photo/{photo}/set-current'
*/
setCurrent.post = (args: { photo: string | number } | [photo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setCurrent.url(args, options),
    method: 'post',
})

const photo = {
    upload: Object.assign(upload, upload),
    delete: Object.assign(deleteMethod, deleteMethod),
    setCurrent: Object.assign(setCurrent, setCurrent),
}

export default photo