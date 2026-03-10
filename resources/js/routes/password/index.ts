import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import confirmD7e05f from './confirm'
import setup90f0be from './setup'
/**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
export const confirm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(options),
    method: 'get',
})

confirm.definition = {
    methods: ["get","head"],
    url: '/user/confirm-password',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
confirm.url = (options?: RouteQueryOptions) => {
    return confirm.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
confirm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
confirm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirm.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
    const confirmForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirm.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
        confirmForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:28
 * @route '/user/confirm-password'
 */
        confirmForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirm.form = confirmForm
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
export const confirmation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/user/confirmed-password-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

confirmation.form = confirmationForm

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
export const setup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(options),
    method: 'get',
})

setup.definition = {
    methods: ["get","head"],
    url: '/password-setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
setup.url = (options?: RouteQueryOptions) => {
    return setup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
setup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
setup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setup.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
const setupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
setupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordSetupController::setup
* @see app/Http/Controllers/Auth/PasswordSetupController.php:12
* @route '/password-setup'
*/
setupForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

setup.form = setupForm

const password = {
    confirm: Object.assign(confirm, confirmD7e05f),
    confirmation: Object.assign(confirmation, confirmation),
    setup: Object.assign(setup, setup90f0be),
}

export default password