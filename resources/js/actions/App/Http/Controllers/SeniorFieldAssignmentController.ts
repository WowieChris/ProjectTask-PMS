import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ConfigFiles/SFE',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::index
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:15
 * @route '/ConfigFiles/SFE'
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
* @see \App\Http\Controllers\SeniorFieldAssignmentController::store
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:35
 * @route '/ConfigFiles/SFE'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ConfigFiles/SFE',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::store
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:35
 * @route '/ConfigFiles/SFE'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::store
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:35
 * @route '/ConfigFiles/SFE'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::store
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:35
 * @route '/ConfigFiles/SFE'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeniorFieldAssignmentController::store
 * @see app/Http/Controllers/SeniorFieldAssignmentController.php:35
 * @route '/ConfigFiles/SFE'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const SeniorFieldAssignmentController = { index, store }

export default SeniorFieldAssignmentController