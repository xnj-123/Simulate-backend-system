<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="SkuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="SkuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input placeholder="重量(g)" v-model="SkuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea" v-model="SkuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性" :inline="true">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr, index) in ownAttr" :key="attr.id"
            style="margin-bottom:10px">
            <el-select style="width:240px" v-model="attr.attridandvalueid">
              <el-option :label="item.valueName" v-for="(item, index) in attr.attrValueList" :key="item.id"
                :value="`${attr.id}:${item.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="attr.saleAttrName" v-for="(attr, index) in hasSaleAttr" :key="attr.id"
            style="margin-bottom:10px">
            <el-select style="width:240px" v-model="attr.attridandvalueid">
              <el-option :label="item.saleAttrValueName" v-for="(item, index) in attr.spuSaleAttrValueList"
                :key="item.id" :value="`${attr.id}:${item.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imageList" ref="table" >
          <el-table-column type="selection" ></el-table-column>
          <el-table-column label="图片" prop="imgName">
            <template #="{ row, $index }">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{row, $index}">
              <el-button type="primary" @click="changeDefault(row)">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-from-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-from-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { AttrResponseData, AttrList } from '@/api/product/attr/type'
import { SaleAttrResponseData, SkuData, SpuImg, SpuHasImg } from '@/api/product/spu/type';
import { reqgetAttr } from '@/api/product/attr';
import { SpuData } from '@/api/product/spu/type';
import { reactive, ref } from 'vue';
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene']);

let ownAttr = ref<any>([])
let hasSaleAttr = ref<any>([])
let imageList = ref<SpuImg[]>([])

let SkuParams = reactive<SkuData>(
  {
    category3Id: '',
    spuId: '',
    tmId: '',

    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',

    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  }
)
let table = ref();

const getSKU = async (c1id: number | string, c2id: number | string, Spu: SpuData) => {
  Object.assign(SkuParams,  {
    category3Id: '',
    spuId: '',
    tmId: '',

    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',

    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  })
  SkuParams.category3Id = Spu.category3Id;
  SkuParams.spuId = (Spu.id as number);
  SkuParams.tmId = Spu.tmId;
  let result: AttrResponseData = await reqgetAttr(c1id, c2id, Spu.category3Id);
  ownAttr.value = result.data;
  let result1: SaleAttrResponseData = await reqSpuHasSaleAttr((Spu.id as number))
  hasSaleAttr.value = result1.data;
  let result2: SpuHasImg = await reqSpuImageList((Spu.id as number))
  imageList.value = result2.data;
}

const changeDefault = (row: any) => {
  table.value.clearSelection();
  table.value.toggleRowSelection(row,true)
  SkuParams.skuDefaultImg = row.imgUrl;
}

const save = async () => {
  SkuParams.skuAttrValueList= ownAttr.value.reduce((prev: any, next: any) => {
    if (next.attridandvalueid) {
      let [attrId, valueId] = next.attridandvalueid.split(':');
      prev.push({
        attrId,
        valueId
      })
    }
    return prev;
  }, []);
  SkuParams.skuSaleAttrValueList = hasSaleAttr.value.reduce((pre:any,next:any)=>{
    if(next.attridandvalueid){
      let [saleAttrId,saleAttrValueId] = next.attridandvalueid.split(':');
      pre.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return pre;
  },[])
  let result = await reqAddSku(SkuParams);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'添加成功'
    })
    $emit('changeScene',{flag:0,params:''});
  }else{
    ElMessage({
      type:'error',
      message:'添加失败'
    })
  }
  console.log(result)
}

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
defineExpose({
  getSKU
})
</script>

<style scoped lang='scss'></style>