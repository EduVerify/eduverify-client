/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'root': RouteRecordInfo<'root', '/', Record<never, never>, Record<never, never>>,
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'forgot-password': RouteRecordInfo<'forgot-password', '/forgot-password', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'posts-id': RouteRecordInfo<'posts-id', '/posts/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'posts-list': RouteRecordInfo<'posts-list', '/posts/list', Record<never, never>, Record<never, never>>,
    'sign-up': RouteRecordInfo<'sign-up', '/sign-up', Record<never, never>, Record<never, never>>,
    'users-me': RouteRecordInfo<'users-me', '/users/me', Record<never, never>, Record<never, never>>,
    'verify-email': RouteRecordInfo<'verify-email', '/verify-email', Record<never, never>, Record<never, never>>,
  }
}
