import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ConfigFiles/Field-Eng/scheduled',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ScheduledTransferController::index
 * @see app/Http/Controllers/ScheduledTransferController.php:0
 * @route '/ConfigFiles/Field-Eng/scheduled'
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
* @see \App\Http\Controllers\ScheduledTransferController::store
 * @see app/Http/Controllers/ScheduledTransferController.php:29
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Field-Eng/scheduled',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledTransferController::store
 * @see app/Http/Controllers/ScheduledTransferController.php:29
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledTransferController::store
 * @see app/Http/Controllers/ScheduledTransferController.php:29
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledTransferController::store
 * @see app/Http/Controllers/ScheduledTransferController.php:29
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledTransferController::store
 * @see app/Http/Controllers/ScheduledTransferController.php:29
 * @route '/ConfigFiles/Field-Eng/scheduled'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ScheduledTransferController::apply
 * @see app/Http/Controllers/ScheduledTransferController.php:85
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply'
 */
export const apply = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledTransferController::apply
 * @see app/Http/Controllers/ScheduledTransferController.php:85
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply'
 */
apply.url = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledTransfer: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { scheduledTransfer: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    scheduledTransfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scheduledTransfer: typeof args.scheduledTransfer === 'object'
                ? args.scheduledTransfer.id
                : args.scheduledTransfer,
                }

    return apply.definition.url
            .replace('{scheduledTransfer}', parsedArgs.scheduledTransfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledTransferController::apply
 * @see app/Http/Controllers/ScheduledTransferController.php:85
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply'
 */
apply.post = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledTransferController::apply
 * @see app/Http/Controllers/ScheduledTransferController.php:85
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply'
 */
    const applyForm = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: apply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledTransferController::apply
 * @see app/Http/Controllers/ScheduledTransferController.php:85
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/apply'
 */
        applyForm.post = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: apply.url(args, options),
            method: 'post',
        })
    
    apply.form = applyForm
/**
* @see \App\Http\Controllers\ScheduledTransferController::cancel
 * @see app/Http/Controllers/ScheduledTransferController.php:102
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel'
 */
export const cancel = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ScheduledTransferController::cancel
 * @see app/Http/Controllers/ScheduledTransferController.php:102
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel'
 */
cancel.url = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scheduledTransfer: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { scheduledTransfer: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    scheduledTransfer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scheduledTransfer: typeof args.scheduledTransfer === 'object'
                ? args.scheduledTransfer.id
                : args.scheduledTransfer,
                }

    return cancel.definition.url
            .replace('{scheduledTransfer}', parsedArgs.scheduledTransfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduledTransferController::cancel
 * @see app/Http/Controllers/ScheduledTransferController.php:102
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel'
 */
cancel.post = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ScheduledTransferController::cancel
 * @see app/Http/Controllers/ScheduledTransferController.php:102
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel'
 */
    const cancelForm = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ScheduledTransferController::cancel
 * @see app/Http/Controllers/ScheduledTransferController.php:102
 * @route '/ConfigFiles/Field-Eng/scheduled/{scheduledTransfer}/cancel'
 */
        cancelForm.post = (args: { scheduledTransfer: number | { id: number } } | [scheduledTransfer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const ScheduledTransferController = { index, store, apply, cancel }

export default ScheduledTransferController