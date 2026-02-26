import {
  queryParams,
  type RouteQueryOptions,
  type RouteDefinition,
  type RouteFormDefinition,
} from './../../wayfinder'

/**
 * Fortify update password
 * PUT /user/password
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
  url: update.url(options),
  method: 'put',
})

update.definition = {
  methods: ['put'],
  url: '/user/password',
} satisfies RouteDefinition<['put']>

update.url = (options?: RouteQueryOptions) => update.definition.url + queryParams(options)

update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
  url: update.url(options),
  method: 'put',
})

const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
  action: update.url({
    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
      _method: 'PUT',
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: 'post',
})

updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
  action: update.url({
    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
      _method: 'PUT',
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: 'post',
})

update.form = updateForm

/**
 * Settings page (Inertia)
 * GET /settings/password
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
  url: edit.url(options),
  method: 'get',
})

edit.definition = {
  methods: ['get', 'head'],
  url: '/settings/password',
} satisfies RouteDefinition<['get', 'head']>

edit.url = (options?: RouteQueryOptions) => edit.definition.url + queryParams(options)

edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
  url: edit.url(options),
  method: 'get',
})

edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
  url: edit.url(options),
  method: 'head',
})

const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
  action: edit.url(options),
  method: 'get',
})

editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
  action: edit.url(options),
  method: 'get',
})

editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
  action: edit.url({
    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
      _method: 'HEAD',
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: 'get',
})

edit.form = editForm

export default {
  update,
  edit,
}