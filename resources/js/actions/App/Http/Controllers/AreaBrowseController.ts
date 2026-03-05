import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
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
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
* @route '/areas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
* @route '/areas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
* @route '/areas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
* @route '/areas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
* @route '/areas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::index
* @see app/Http/Controllers/AreaBrowseController.php:13
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
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
export const showArea = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showArea.url(args, options),
    method: 'get',
})

showArea.definition = {
    methods: ["get","head"],
    url: '/areas/{area}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
showArea.url = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { area: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { area: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            area: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        area: typeof args.area === 'object'
        ? args.area.id
        : args.area,
    }

    return showArea.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
showArea.get = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showArea.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
showArea.head = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showArea.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
const showAreaForm = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showArea.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
showAreaForm.get = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showArea.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showArea
* @see app/Http/Controllers/AreaBrowseController.php:25
* @route '/areas/{area}'
*/
showAreaForm.head = (args: { area: number | { id: number } } | [area: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
export const showDivision = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDivision.url(args, options),
    method: 'get',
})

showDivision.definition = {
    methods: ["get","head"],
    url: '/areas/{area}/divisions/{division}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
showDivision.url = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            area: args[0],
            division: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        area: typeof args.area === 'object'
        ? args.area.id
        : args.area,
        division: typeof args.division === 'object'
        ? args.division.id
        : args.division,
    }

    return showDivision.definition.url
            .replace('{area}', parsedArgs.area.toString())
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
showDivision.get = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDivision.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
showDivision.head = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showDivision.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
const showDivisionForm = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDivision.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
showDivisionForm.get = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDivision.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AreaBrowseController::showDivision
* @see app/Http/Controllers/AreaBrowseController.php:39
* @route '/areas/{area}/divisions/{division}'
*/
showDivisionForm.head = (args: { area: number | { id: number }, division: number | { id: number } } | [area: number | { id: number }, division: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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