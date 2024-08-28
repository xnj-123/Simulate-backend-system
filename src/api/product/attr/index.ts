import request from '@/utils/request'

import { CategoryResponseDate,AttrResponseData,Attr } from './type';

enum API {
    GET_CATE1ID = '/admin/product/getCategory1',
    GET_CATE2ID = '/admin/product/getCategory2/',
    GET_CATE3ID = '/admin/product/getCategory3/',
    GETATTR_URL = '/admin/product/attrInfoList/',
    SAVEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqgetcate1id = () => request.get<any,CategoryResponseDate>(API.GET_CATE1ID);
export const reqgetcate2id = (category1id:number|string) => request.get<any,CategoryResponseDate>(API.GET_CATE2ID+category1id);
export const reqgetcate3id = (category2id:number|string) => request.get<any,CategoryResponseDate>(API.GET_CATE3ID+category2id);

export const reqgetAttr = (category1id:number|string,category2id:number|string,category3id:number|string)=> 
    request.get<any,AttrResponseData>(API.GETATTR_URL+`${category1id}/${category2id}/${category3id}`);

export const reqSaveAttr = (data: Attr) =>
    request.post<any, any>(API.SAVEATTR_URL, data)

export const reqdeleteAttr = (attrid:number) => request.delete<any,any>(API.DELETEATTR_URL+attrid)
