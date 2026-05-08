import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::store
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:29
 * @route '/scheduled-location-moves'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/scheduled-location-moves',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::store
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:29
 * @route '/scheduled-location-moves'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::store
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:29
 * @route '/scheduled-location-moves'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::store
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:29
 * @route '/scheduled-location-moves'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::store
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:29
 * @route '/scheduled-location-moves'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::apply
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:59
 * @route '/scheduled-location-moves/{scheduledLocationMove}/apply'
 */
export const apply = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/scheduled-location-moves/{scheduledLocationMove}/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::apply
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:59
 * @route '/scheduled-location-moves/{scheduledLocationMove}/apply'
 */
apply.url = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledLocationMove: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { scheduledLocationMove: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    scheduledLocationMove: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scheduledLocationMove: typeof args.scheduledLocationMove === 'object'
                ? args.scheduledLocationMove.id
                : args.scheduledLocationMove,
                }

    return apply.definition.url
            .replace('{scheduledLocationMove}', parsedArgs.scheduledLocationMove.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::apply
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:59
 * @route '/scheduled-location-moves/{scheduledLocationMove}/apply'
 */
apply.post = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::apply
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:59
 * @route '/scheduled-location-moves/{scheduledLocationMove}/apply'
 */
    const applyForm = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: apply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::apply
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:59
 * @route '/scheduled-location-moves/{scheduledLocationMove}/apply'
 */
        applyForm.post = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: apply.url(args, options),
            method: 'post',
        })
    
    apply.form = applyForm
/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::cancel
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:76
 * @route '/scheduled-location-moves/{scheduledLocationMove}/cancel'
 */
export const cancel = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/scheduled-location-moves/{scheduledLocationMove}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::cancel
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:76
 * @route '/scheduled-location-moves/{scheduledLocationMove}/cancel'
 */
cancel.url = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledLocationMove: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { scheduledLocationMove: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    scheduledLocationMove: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scheduledLocationMove: typeof args.scheduledLocationMove === 'object'
                ? args.scheduledLocationMove.id
                : args.scheduledLocationMove,
                }

    return cancel.definition.url
            .replace('{scheduledLocationMove}', parsedArgs.scheduledLocationMove.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledLocationMoveController::cancel
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:76
 * @route '/scheduled-location-moves/{scheduledLocationMove}/cancel'
 */
cancel.post = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::cancel
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:76
 * @route '/scheduled-location-moves/{scheduledLocationMove}/cancel'
 */
    const cancelForm = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledLocationMoveController::cancel
 * @see app/Http/Controllers/ScheduledLocationMoveController.php:76
 * @route '/scheduled-location-moves/{scheduledLocationMove}/cancel'
 */
        cancelForm.post = (args: { scheduledLocationMove: number | { id: number } } | [scheduledLocationMove: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const ScheduledLocationMoveController = { store, apply, cancel }

export default ScheduledLocationMoveController