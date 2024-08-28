export interface ResponseData {
    code:number,
    message:string,
    ok:boolean
}
export interface Attr {
    id?: number
    attrId: number
    valueId: number
  }
  export interface saleAttr {
    id?: number
    saleAttrId: number
    saleAttrValueId: number
  }
export interface Sku {
    id:number,
    spuId:number,
    price:number,
    skuName:string,
    skuDesc:string,
    weight:number,
    tmId:number,
    category3Id:number,
    skuDefaultImg:string,
    isSale:number,
    skuImageList:null,
    skuAttrValueList:Attr[],
    skuSaleAttrValueList:saleAttr[],
}

export type records = Sku[];

export interface SkuListResponseData extends ResponseData {
    data:{
        records:records,
        total:number,
        size:number,
        current:number,
        orders:any[],
        optimizeCountSql:boolean,
        hitCount:boolean,
        countId:null,
        maxLimit:null,
        searchCount:boolean,
        pages:number,
    }
}
export interface SkuInfoData extends ResponseData {
    data: Sku
}
  



