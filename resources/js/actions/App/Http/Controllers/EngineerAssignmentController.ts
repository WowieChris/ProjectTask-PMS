import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EngineerAssignmentController::saveAreaOverride
 * @see app/Http/Controllers/EngineerAssignmentController.php:142
 * @route '/ConfigFiles/Field-Eng/area-override'
 */
export const saveAreaOverride = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveAreaOverride.url(options),
    method: 'post',
})

saveAreaOverride.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Field-Eng/area-override',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EngineerAssignmentController::saveAreaOverride
 * @see app/Http/Controllers/EngineerAssignmentController.php:142
 * @route '/ConfigFiles/Field-Eng/area-override'
 */
saveAreaOverride.url = (options?: RouteQueryOptions) => {
    return saveAreaOverride.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EngineerAssignmentController::saveAreaOverride
 * @see app/Http/Controllers/EngineerAssignmentController.php:142
 * @route '/ConfigFiles/Field-Eng/area-override'
 */
saveAreaOverride.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveAreaOverride.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EngineerAssignmentController::saveAreaOverride
 * @see app/Http/Controllers/EngineerAssignmentController.php:142
 * @route '/ConfigFiles/Field-Eng/area-override'
 */
    const saveAreaOverrideForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveAreaOverride.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EngineerAssignmentController::saveAreaOverride
 * @see app/Http/Controllers/EngineerAssignmentController.php:142
 * @route '/ConfigFiles/Field-Eng/area-override'
 */
        saveAreaOverrideForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveAreaOverride.url(options),
            method: 'post',
        })
    
    saveAreaOverride.form = saveAreaOverrideForm
/**
* @see \App\Http\Controllers\EngineerAssignmentController::store
 * @see app/Http/Controllers/EngineerAssignmentController.php:63
 * @route '/ConfigFiles/Field-Eng'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ConfigFiles/Field-Eng',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EngineerAssignmentController::store
 * @see app/Http/Controllers/EngineerAssignmentController.php:63
 * @route '/ConfigFiles/Field-Eng'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EngineerAssignmentController::store
 * @see app/Http/Controllers/EngineerAssignmentController.php:63
 * @route '/ConfigFiles/Field-Eng'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EngineerAssignmentController::store
 * @see app/Http/Controllers/EngineerAssignmentController.php:63
 * @route '/ConfigFiles/Field-Eng'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EngineerAssignmentController::store
 * @see app/Http/Controllers/EngineerAssignmentController.php:63
 * @route '/ConfigFiles/Field-Eng'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
export const Index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Index.url(options),
    method: 'get',
})

Index.definition = {
    methods: ["get","head"],
    url: '/ConfigFiles/Field-Eng',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
Index.url = (options?: RouteQueryOptions) => {
    return Index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
Index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
Index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
    const IndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
        IndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EngineerAssignmentController::Index
 * @see app/Http/Controllers/EngineerAssignmentController.php:19
 * @route '/ConfigFiles/Field-Eng'
 */
        IndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Index.form = IndexForm
const EngineerAssignmentController = { saveAreaOverride, store, Index }

export default EngineerAssignmentController