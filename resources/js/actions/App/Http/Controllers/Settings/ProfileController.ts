import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
const editfc6874003af373efc88e5e18eecd9c17 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})

editfc6874003af373efc88e5e18eecd9c17.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
editfc6874003af373efc88e5e18eecd9c17.url = (options?: RouteQueryOptions) => {
    return editfc6874003af373efc88e5e18eecd9c17.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
editfc6874003af373efc88e5e18eecd9c17.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
editfc6874003af373efc88e5e18eecd9c17.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
const editfc6874003af373efc88e5e18eecd9c17Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
editfc6874003af373efc88e5e18eecd9c17Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile'
*/
editfc6874003af373efc88e5e18eecd9c17Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editfc6874003af373efc88e5e18eecd9c17.form = editfc6874003af373efc88e5e18eecd9c17Form
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
const edit24687f65a62c096e1216245125a00d83 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit24687f65a62c096e1216245125a00d83.url(options),
    method: 'get',
})

edit24687f65a62c096e1216245125a00d83.definition = {
    methods: ["get","head"],
    url: '/settings/profile/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
edit24687f65a62c096e1216245125a00d83.url = (options?: RouteQueryOptions) => {
    return edit24687f65a62c096e1216245125a00d83.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
edit24687f65a62c096e1216245125a00d83.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit24687f65a62c096e1216245125a00d83.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
edit24687f65a62c096e1216245125a00d83.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit24687f65a62c096e1216245125a00d83.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
const edit24687f65a62c096e1216245125a00d83Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit24687f65a62c096e1216245125a00d83.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
edit24687f65a62c096e1216245125a00d83Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit24687f65a62c096e1216245125a00d83.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:18
* @route '/settings/profile/edit'
*/
edit24687f65a62c096e1216245125a00d83Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit24687f65a62c096e1216245125a00d83.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit24687f65a62c096e1216245125a00d83.form = edit24687f65a62c096e1216245125a00d83Form

export const edit = {
    '/settings/profile': editfc6874003af373efc88e5e18eecd9c17,
    '/settings/profile/edit': edit24687f65a62c096e1216245125a00d83,
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:43
* @route '/settings/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:43
* @route '/settings/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:43
* @route '/settings/profile'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:43
* @route '/settings/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:43
* @route '/settings/profile'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:83
* @route '/settings/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:83
* @route '/settings/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:83
* @route '/settings/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:83
* @route '/settings/profile'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:83
* @route '/settings/profile'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProfileController = { edit, update, destroy }

export default ProfileController