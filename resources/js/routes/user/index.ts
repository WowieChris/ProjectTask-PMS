import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import photo from './photo'
/**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
export const photos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: photos.url(options),
    method: 'get',
})

photos.definition = {
    methods: ["get","head"],
    url: '/user/photos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
photos.url = (options?: RouteQueryOptions) => {
    return photos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
photos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: photos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
photos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: photos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
    const photosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: photos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
        photosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: photos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::photos
 * @see app/Http/Controllers/UserController.php:0
 * @route '/user/photos'
 */
        photosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: photos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    photos.form = photosForm
const user = {
    photo: Object.assign(photo, photo),
photos: Object.assign(photos, photos),
}

export default user