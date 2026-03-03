import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const setup = {
    update: Object.assign(update, update),
}

export default setup