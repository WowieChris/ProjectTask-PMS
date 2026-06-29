import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/api/psgc/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
    const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: all.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
        allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::all
 * @see [unknown]:0
 * @route '/api/psgc/all'
 */
        allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    all.form = allForm
const PsgcController = { all }

export default PsgcController