import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/areas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \AreaBrowseController::index
 * @see [unknown]:0
 * @route '/areas'
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
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
export const area = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: area.url(args, options),
    method: 'get',
})

area.definition = {
    methods: ["get","head"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
area.url = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: args.area,
                }

    return area.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
area.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: area.url(args, options),
    method: 'get',
})
/**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
area.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: area.url(args, options),
    method: 'head',
})

    /**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
    const areaForm = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: area.url(args, options),
        method: 'get',
    })

            /**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
        areaForm.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: area.url(args, options),
            method: 'get',
        })
            /**
* @see \AreaBrowseController::area
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
        areaForm.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: area.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    area.form = areaForm
/**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
export const division = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: division.url(args, options),
    method: 'get',
})

division.definition = {
    methods: ["get","head"],
    url: '/areas/{area}/divisions/{division}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.url = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    area: args[0],
                    division: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        area: args.area,
                                division: args.division,
                }

    return division.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: division.url(args, options),
    method: 'get',
})
/**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
division.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: division.url(args, options),
    method: 'head',
})

    /**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
    const divisionForm = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: division.url(args, options),
        method: 'get',
    })

            /**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
        divisionForm.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: division.url(args, options),
            method: 'get',
        })
            /**
* @see \AreaBrowseController::division
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
        divisionForm.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: division.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    division.form = divisionForm
const browse = {
    index: Object.assign(index, index),
area: Object.assign(area, area),
division: Object.assign(division, division),
}

export default browse