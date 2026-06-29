import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
export const mapData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mapData.url(options),
    method: 'get',
})

mapData.definition = {
    methods: ["get","head"],
    url: '/api/offices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
mapData.url = (options?: RouteQueryOptions) => {
    return mapData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
mapData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mapData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
mapData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mapData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
    const mapDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: mapData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
        mapDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mapData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OfficeAddressController::mapData
 * @see app/Http/Controllers/OfficeAddressController.php:17
 * @route '/api/offices'
 */
        mapDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mapData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    mapData.form = mapDataForm
/**
* @see \App\Http\Controllers\OfficeAddressController::movePin
 * @see app/Http/Controllers/OfficeAddressController.php:0
 * @route '/api/offices/{level}/{id}/pin'
 */
export const movePin = (args: { level: string | number, id: string | number } | [level: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: movePin.url(args, options),
    method: 'patch',
})

movePin.definition = {
    methods: ["patch"],
    url: '/api/offices/{level}/{id}/pin',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\OfficeAddressController::movePin
 * @see app/Http/Controllers/OfficeAddressController.php:0
 * @route '/api/offices/{level}/{id}/pin'
 */
movePin.url = (args: { level: string | number, id: string | number } | [level: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    level: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        level: args.level,
                                id: args.id,
                }

    return movePin.definition.url
            .replace('{level}', parsedArgs.level.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OfficeAddressController::movePin
 * @see app/Http/Controllers/OfficeAddressController.php:0
 * @route '/api/offices/{level}/{id}/pin'
 */
movePin.patch = (args: { level: string | number, id: string | number } | [level: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: movePin.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\OfficeAddressController::movePin
 * @see app/Http/Controllers/OfficeAddressController.php:0
 * @route '/api/offices/{level}/{id}/pin'
 */
    const movePinForm = (args: { level: string | number, id: string | number } | [level: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: movePin.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OfficeAddressController::movePin
 * @see app/Http/Controllers/OfficeAddressController.php:0
 * @route '/api/offices/{level}/{id}/pin'
 */
        movePinForm.patch = (args: { level: string | number, id: string | number } | [level: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: movePin.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    movePin.form = movePinForm
const OfficeAddressController = { mapData, movePin }

export default OfficeAddressController