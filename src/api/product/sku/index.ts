import request from '@/utils/request'

import { SkuListResponseData,SkuInfoData } from './type'

enum API {
    GETSKULIST_URL = '/admin/product/list/',
    UPDATEONSALE_URL = '/admin/product/onSale/',
    CANCELSALE_URL = '/admin/product/cancelSale/',
    SKUINFO_URL = '/admin/product/getSkuInfo/',
    DELETESKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuList = (page:number, limit:number) => request.get<any,SkuListResponseData>(API.GETSKULIST_URL+`${page}/${limit}`)
export const reqUpdateOnSale = (skuid:number)=>request.get<any,any>(API.UPDATEONSALE_URL+skuid)
export const reqCancelSale = (skuid:number)=>request.get<any,any>(API.CANCELSALE_URL+skuid)

export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
export const reqRemoveSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)
  