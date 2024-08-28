interface ResponseData {
    code:number,
    ok:boolean,
    message:string
}

export interface CategoryObj {
    id: number | string
    name: string
    category1Id?: number
    category2Id?: number
  }
 
 export interface CategoryResponseDate extends ResponseData {
    data:CategoryObj[],
 } 


 export interface AttrValue {
    id?: number
    valueName: string
    attrId?: number
    flag?: boolean
  }
  export type AttrValueList = AttrValue[]

  export interface Attr {
    id?: number
    attrName: string
    categoryId: number | string
    categoryLevel: number
    attrValueList: AttrValueList
  }
  export type AttrList = Attr[]

  export interface AttrResponseData extends ResponseData {
    data: Attr[]
  }
  