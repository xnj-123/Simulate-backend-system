import {defineStore} from 'pinia';

import { reqgetcate1id,reqgetcate2id,reqgetcate3id } from '@/api/product/attr';
import { CategoryState } from './types/type';

const attrStore = defineStore('attr',{
    state:():CategoryState=>{
        return {
            c1Arr:[],
            c2Arr:[],
            c3Arr:[],
            c1Id:'',
            c2Id:'',
            c3Id:'',
        }
    },
    actions:{
        async getcateList1(){
            let result =await reqgetcate1id();
            if(result.code==200){
                this.c1Arr = result.data;
            }
        },
        async getcateList2(){
            let result = await reqgetcate2id(this.c1Id);
            if(result.code==200){
                this.c2Arr = result.data
            }
        },
        async getcateList3(){
            let result = await reqgetcate3id(this.c2Id);
            if(result.code==200){
                this.c3Arr = result.data
            }
        }
    },
    getters:{

    }
})

export default attrStore;