import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
export const logs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/navigation/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
logs.url = (options?: RouteQueryOptions) => {
    return logs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
logs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
logs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
    const logsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: logs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
        logsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NavigationController::logs
 * @see app/Http/Controllers/NavigationController.php:197
 * @route '/navigation/logs'
 */
        logsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    logs.form = logsForm
/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
export const engineerTransferLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: engineerTransferLogs.url(options),
    method: 'get',
})

engineerTransferLogs.definition = {
    methods: ["get","head"],
    url: '/navigation/EngineerTransferLogs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.url = (options?: RouteQueryOptions) => {
    return engineerTransferLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: engineerTransferLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: engineerTransferLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
    const engineerTransferLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: engineerTransferLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
        engineerTransferLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: engineerTransferLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:235
 * @route '/navigation/EngineerTransferLogs'
 */
        engineerTransferLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: engineerTransferLogs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    engineerTransferLogs.form = engineerTransferLogsForm
/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:59
 * @route '/navigation/move'
 */
export const move = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

move.definition = {
    methods: ["patch"],
    url: '/navigation/move',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:59
 * @route '/navigation/move'
 */
move.url = (options?: RouteQueryOptions) => {
    return move.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:59
 * @route '/navigation/move'
 */
move.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:59
 * @route '/navigation/move'
 */
    const moveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NavigationController::move
 * @see app/Http/Controllers/NavigationController.php:59
 * @route '/navigation/move'
 */
        moveForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ConfigFiles/Navigation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NavigationController::index
 * @see app/Http/Controllers/NavigationController.php:23
 * @route '/ConfigFiles/Navigation'
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
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:125
 * @route '/ConfigFiles/Navigation'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Navigation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:125
 * @route '/ConfigFiles/Navigation'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:125
 * @route '/ConfigFiles/Navigation'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:125
 * @route '/ConfigFiles/Navigation'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NavigationController::store
 * @see app/Http/Controllers/NavigationController.php:125
 * @route '/ConfigFiles/Navigation'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\NavigationController::assignSeniorFieldGroup
 * @see app/Http/Controllers/NavigationController.php:300
 * @route '/seniorfieldassignment'
 */
export const assignSeniorFieldGroup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignSeniorFieldGroup.url(options),
    method: 'post',
})

assignSeniorFieldGroup.definition = {
    methods: ["post"],
    url: '/seniorfieldassignment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NavigationController::assignSeniorFieldGroup
 * @see app/Http/Controllers/NavigationController.php:300
 * @route '/seniorfieldassignment'
 */
assignSeniorFieldGroup.url = (options?: RouteQueryOptions) => {
    return assignSeniorFieldGroup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::assignSeniorFieldGroup
 * @see app/Http/Controllers/NavigationController.php:300
 * @route '/seniorfieldassignment'
 */
assignSeniorFieldGroup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignSeniorFieldGroup.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NavigationController::assignSeniorFieldGroup
 * @see app/Http/Controllers/NavigationController.php:300
 * @route '/seniorfieldassignment'
 */
    const assignSeniorFieldGroupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignSeniorFieldGroup.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NavigationController::assignSeniorFieldGroup
 * @see app/Http/Controllers/NavigationController.php:300
 * @route '/seniorfieldassignment'
 */
        assignSeniorFieldGroupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignSeniorFieldGroup.url(options),
            method: 'post',
        })
    
    assignSeniorFieldGroup.form = assignSeniorFieldGroupForm
const NavigationController = { logs, engineerTransferLogs, move, index, store, assignSeniorFieldGroup }

export default NavigationController