import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
export const designations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: designations.url(options),
    method: 'get',
})

designations.definition = {
    methods: ["get","head"],
    url: '/dashboard/designations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
designations.url = (options?: RouteQueryOptions) => {
    return designations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
designations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: designations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
designations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: designations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
const designationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: designations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
designationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: designations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::designations
* @see app/Http/Controllers/DashboardController.php:14
* @route '/dashboard/designations'
*/
designationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: designations.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

designations.form = designationsForm

const DashboardController = { designations }

export default DashboardController