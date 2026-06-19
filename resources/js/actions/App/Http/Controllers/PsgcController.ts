import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
export const refreshCache = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refreshCache.url(options),
    method: 'get',
})

refreshCache.definition = {
    methods: ["get","head"],
    url: '/psgc/refresh',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
refreshCache.url = (options?: RouteQueryOptions) => {
    return refreshCache.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
refreshCache.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refreshCache.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
refreshCache.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: refreshCache.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
    const refreshCacheForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: refreshCache.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
        refreshCacheForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refreshCache.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::refreshCache
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/refresh'
 */
        refreshCacheForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refreshCache.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    refreshCache.form = refreshCacheForm
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
export const regions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})

regions.definition = {
    methods: ["get","head"],
    url: '/psgc/regions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
regions.url = (options?: RouteQueryOptions) => {
    return regions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
regions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
regions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
    const regionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
        regionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:10
 * @route '/psgc/regions'
 */
        regionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regions.form = regionsForm
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
export const provinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/psgc/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
provinces.url = (options?: RouteQueryOptions) => {
    return provinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
provinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
provinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
    const provincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: provinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
        provincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/provinces'
 */
        provincesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    provinces.form = provincesForm
/**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
export const municipalities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: municipalities.url(options),
    method: 'get',
})

municipalities.definition = {
    methods: ["get","head"],
    url: '/psgc/municipalities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
municipalities.url = (options?: RouteQueryOptions) => {
    return municipalities.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
municipalities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: municipalities.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
municipalities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: municipalities.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
    const municipalitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: municipalities.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
        municipalitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: municipalities.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::municipalities
 * @see app/Http/Controllers/PsgcController.php:29
 * @route '/psgc/municipalities'
 */
        municipalitiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: municipalities.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    municipalities.form = municipalitiesForm
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
export const barangays = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(options),
    method: 'get',
})

barangays.definition = {
    methods: ["get","head"],
    url: '/psgc/barangays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
barangays.url = (options?: RouteQueryOptions) => {
    return barangays.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
barangays.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
barangays.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangays.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
    const barangaysForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangays.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
        barangaysForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:43
 * @route '/psgc/barangays'
 */
        barangaysForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangays.form = barangaysForm
/**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
export const locations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locations.url(options),
    method: 'get',
})

locations.definition = {
    methods: ["get","head"],
    url: '/psgc/locations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
locations.url = (options?: RouteQueryOptions) => {
    return locations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
locations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
locations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locations.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
    const locationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: locations.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
        locationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locations.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::locations
 * @see app/Http/Controllers/PsgcController.php:0
 * @route '/psgc/locations'
 */
        locationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    locations.form = locationsForm
const PsgcController = { refreshCache, regions, provinces, municipalities, barangays, locations }

export default PsgcController