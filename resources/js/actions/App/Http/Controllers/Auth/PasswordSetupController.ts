import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/password-setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::show
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::update
* @see app/Http/Controllers/Auth/PasswordSetupController.php:17
* @route '/password-setup'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/password-setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::update
* @see app/Http/Controllers/Auth/PasswordSetupController.php:17
* @route '/password-setup'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::update
* @see app/Http/Controllers/Auth/PasswordSetupController.php:17
* @route '/password-setup'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::update
* @see app/Http/Controllers/Auth/PasswordSetupController.php:17
* @route '/password-setup'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::update
* @see app/Http/Controllers/Auth/PasswordSetupController.php:17
* @route '/password-setup'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const PasswordSetupController = { show, update }

export default PasswordSetupController