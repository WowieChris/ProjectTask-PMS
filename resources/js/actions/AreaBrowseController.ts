import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
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
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
export const showArea = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showArea.url(args, options),
    method: 'get',
})

showArea.definition = {
    methods: ["get","head"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
showArea.url = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showArea.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
showArea.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showArea.url(args, options),
    method: 'get',
})
/**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
showArea.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showArea.url(args, options),
    method: 'head',
})

    /**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
    const showAreaForm = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showArea.url(args, options),
        method: 'get',
    })

            /**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
        showAreaForm.get = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showArea.url(args, options),
            method: 'get',
        })
            /**
* @see \AreaBrowseController::showArea
 * @see [unknown]:0
 * @route '/areas/{area}'
 */
        showAreaForm.head = (args: { area: string | number } | [area: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showArea.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showArea.form = showAreaForm
/**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
export const showDivision = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDivision.url(args, options),
    method: 'get',
})

showDivision.definition = {
    methods: ["get","head"],
    url: '/areas/{area}/divisions/{division}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
showDivision.url = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions) => {
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

    return showDivision.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
showDivision.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDivision.url(args, options),
    method: 'get',
})
/**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
showDivision.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showDivision.url(args, options),
    method: 'head',
})

    /**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
    const showDivisionForm = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showDivision.url(args, options),
        method: 'get',
    })

            /**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
        showDivisionForm.get = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showDivision.url(args, options),
            method: 'get',
        })
            /**
* @see \AreaBrowseController::showDivision
 * @see [unknown]:0
 * @route '/areas/{area}/divisions/{division}'
 */
        showDivisionForm.head = (args: { area: string | number, division: string | number } | [area: string | number, division: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showDivision.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showDivision.form = showDivisionForm
const AreaBrowseController = { index, showArea, showDivision }

export default AreaBrowseController