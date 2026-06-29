import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\GeocodingController::geocode
 * @see app/Http/Controllers/Api/GeocodingController.php:12
 * @route '/geomap/geocode'
 */
export const geocode = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: geocode.url(options),
    method: 'post',
})

geocode.definition = {
    methods: ["post"],
    url: '/geomap/geocode',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\GeocodingController::geocode
 * @see app/Http/Controllers/Api/GeocodingController.php:12
 * @route '/geomap/geocode'
 */
geocode.url = (options?: RouteQueryOptions) => {
    return geocode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeocodingController::geocode
 * @see app/Http/Controllers/Api/GeocodingController.php:12
 * @route '/geomap/geocode'
 */
geocode.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: geocode.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\GeocodingController::geocode
 * @see app/Http/Controllers/Api/GeocodingController.php:12
 * @route '/geomap/geocode'
 */
    const geocodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: geocode.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\GeocodingController::geocode
 * @see app/Http/Controllers/Api/GeocodingController.php:12
 * @route '/geomap/geocode'
 */
        geocodeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: geocode.url(options),
            method: 'post',
        })
    
    geocode.form = geocodeForm
/**
* @see \App\Http\Controllers\Api\GeocodingController::reverse
 * @see app/Http/Controllers/Api/GeocodingController.php:27
 * @route '/geomap/reverse-geocode'
 */
export const reverse = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reverse.url(options),
    method: 'post',
})

reverse.definition = {
    methods: ["post"],
    url: '/geomap/reverse-geocode',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\GeocodingController::reverse
 * @see app/Http/Controllers/Api/GeocodingController.php:27
 * @route '/geomap/reverse-geocode'
 */
reverse.url = (options?: RouteQueryOptions) => {
    return reverse.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\GeocodingController::reverse
 * @see app/Http/Controllers/Api/GeocodingController.php:27
 * @route '/geomap/reverse-geocode'
 */
reverse.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reverse.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\GeocodingController::reverse
 * @see app/Http/Controllers/Api/GeocodingController.php:27
 * @route '/geomap/reverse-geocode'
 */
    const reverseForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reverse.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\GeocodingController::reverse
 * @see app/Http/Controllers/Api/GeocodingController.php:27
 * @route '/geomap/reverse-geocode'
 */
        reverseForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reverse.url(options),
            method: 'post',
        })
    
    reverse.form = reverseForm
const GeocodingController = { geocode, reverse }

export default GeocodingController