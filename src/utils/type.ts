export type CommonSingleType = Object | String | Number | Boolean | null | undefined //通用单个联合类型

export type CommonAllType = CommonSingleType | Array<CommonSingleType> | Map<CommonSingleType, CommonSingleType>
