import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
export const field = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: field.url(options),
    method: 'get',
})

field.definition = {
    methods: ["get","head"],
    url: '/service-order/field-eng',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
field.url = (options?: RouteQueryOptions) => {
    return field.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
field.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: field.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
field.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: field.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
    const fieldForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: field.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
        fieldForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: field.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:152
 * @route '/service-order/field-eng'
 */
        fieldForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: field.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    field.form = fieldForm
/**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
export const tech = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tech.url(options),
    method: 'get',
})

tech.definition = {
    methods: ["get","head"],
    url: '/service-order/technical-support-eng',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
tech.url = (options?: RouteQueryOptions) => {
    return tech.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
tech.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tech.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
tech.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tech.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
    const techForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tech.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
        techForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tech.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:156
 * @route '/service-order/technical-support-eng'
 */
        techForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tech.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tech.form = techForm
/**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
export const infra = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: infra.url(options),
    method: 'get',
})

infra.definition = {
    methods: ["get","head"],
    url: '/service-order/infrastructure-eng',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
infra.url = (options?: RouteQueryOptions) => {
    return infra.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
infra.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: infra.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
infra.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: infra.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
    const infraForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: infra.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
        infraForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: infra.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:160
 * @route '/service-order/infrastructure-eng'
 */
        infraForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: infra.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    infra.form = infraForm
const serviceOrder = {
    field: Object.assign(field, field),
tech: Object.assign(tech, tech),
infra: Object.assign(infra, infra),
}

export default serviceOrder