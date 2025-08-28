/**
 * URL 参数提取
 * type UserApiParams = ExtractUrlParams<'/api/users?page=1&limit=10&search=john'>;
 * // 结果：{ page: string; limit: string; search: string }
 */
export type ExtractUrlParams<T> = T extends `${string}?${infer Params}`
  ? Params extends `${infer Param}=${infer Value}&${infer Rest}`
    ? { [K in Param]: string } & ExtractUrlParams<`?${Rest}`>
    : Params extends `${infer Param}=${infer Value}`
      ? { [K in Param]: string }
      : {}
  : {};
