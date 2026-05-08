import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
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
 * @see app/Http/Controllers/NavigationController.php:268
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.url = (options?: RouteQueryOptions) => {
    return engineerTransferLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: engineerTransferLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
 * @route '/navigation/EngineerTransferLogs'
 */
engineerTransferLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: engineerTransferLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
 * @route '/navigation/EngineerTransferLogs'
 */
    const engineerTransferLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: engineerTransferLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
 * @route '/navigation/EngineerTransferLogs'
 */
        engineerTransferLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: engineerTransferLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NavigationController::engineerTransferLogs
 * @see app/Http/Controllers/NavigationController.php:268
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
const navigation = {
    engineerTransferLogs: Object.assign(engineerTransferLogs, engineerTransferLogs),
}

export default navigation