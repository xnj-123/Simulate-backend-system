<template>
  <div>
    <Category :scene="scene"></category>
    <el-card style="margin-top: 20px;">
      <div v-show="scene == 0">
        <el-button icon="Plus" type="primary" :disabled="categoryStore.c3Id ? false : true"
          @click="addSPU">添加SPU</el-button>
        <el-table border style="margin:10px 0" :data="records">
          <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" :show-overflow-tooltip="true" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button title="添加SKU" icon="Plus" size="small" type="primary"
                @click="addSku(categoryStore.c1Id, categoryStore.c2Id, row)"></el-button>
              <el-button title="修改SPU" icon="Edit" size="small" type="primary" @click="updateSPU(row)"></el-button>
              <el-button title="查看SKU列表" icon="View" size="small" type="primary" @click="showSkuLits(row.id)"></el-button>
              <el-button title="删除SPU" icon="Delete" size="small" type="primary" @click="deleteSpu(row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="PageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            :small="true" :background="true" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
            @current-change="handlepageNo" @size-change="handleLimit" />
        </div>
      </div>
      <Spuform v-show="scene == 1" ref="spu" @changeScene="changescene"></Spuform>
      <Skuform v-show="scene == 2" ref="sku" @changeScene="changescene"></Skuform>
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/attr'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu';
import { HasSpuResponseData, Records, SpuData,SkuData } from '@/api/product/spu/type'
import Skuform from './skuform.vue'
import Spuform from './spuform.vue';
import { ElMessage } from 'element-plus';

let categoryStore = useCategoryStore();

let scene = ref<number>(0);
let PageNo = ref<number>(0);
let limit = ref<number>(3);
let total = ref<number>(0);
let records = ref<Records>([]);
let show = ref<boolean>(false);

let skuArr = ref<SkuData[]>([])

const spu = ref();
const sku = ref();

const deleteSpu = async (spuid:number|string)=>{
  let result = await reqRemoveSpu(spuid);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'删除成功',
    })
    getSPU();
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}

watch(() => categoryStore.c3Id, () => {
  if (!categoryStore.c3Id) return;
  getSPU();
})

const getSPU = async (pager: number = 1) => {
  PageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(PageNo.value, limit.value, categoryStore.c3Id);
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
}
const handlepageNo = () => {
  getSPU(PageNo.value);
}
const handleLimit = () => {
  getSPU();
}

const showSkuLits = async (spuid:number|string)=>{
  show.value=true;
  let result = await reqSkuList(spuid);
  skuArr.value = result.data;

}

const addSPU = () => {
  scene.value = 1;
  spu.value.addinitSPU(categoryStore.c3Id);
}

const addSku = (c1id: number | string, c2id: number | string, row: SpuData) => {
  scene.value = 2;
  sku.value.getSKU(c1id, c2id, row)
}

const updateSPU = (row: SpuData) => {
  scene.value = 1;
  spu.value.initSPU(row);
}

const changescene = (obj: any) => {
  scene.value = obj.flag;
  if (obj.params == 'update') {
    getSPU(PageNo.value)
  } else {
    getSPU()
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset();
})

</script>

<style scoped lang='scss'></style>