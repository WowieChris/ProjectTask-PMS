import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
export const request = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})

request.definition = {
    methods: ["get","head"],
    url: '/EAMonitoring/Request',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
request.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
request.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: request.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
    const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: request.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
        requestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:182
 * @route '/EAMonitoring/Request'
 */
        requestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    request.form = requestForm
import request from './request'
import hva from './hva'
const EAMonitoring = {
    request: Object.assign(request, request),
hva: Object.assign(hva, hva),
}

export default EAMonitoring