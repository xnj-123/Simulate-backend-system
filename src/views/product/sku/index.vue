<template>
  <el-card>
    <el-table :border="true" :data="SkuArr">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column label="默认图片" width="180px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250px">
        <template #="{ row, index }">
          <el-button type="primary" size="small" :icon="row.isSale == 0 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled" @click="showSkuInfo(row.id)"></el-button>
          <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
            icon-color="#626AEF" :title="`你确定删除${row.skuName}吗`" @confirm="deleteSku(row.id)">
            <template #reference>
              <el-button icon="Delete" size="small" type="primary"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block" style="margin-top: 10px">
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="changePage" @size-change="changeSize" />
    </div>
    <el-drawer v-model="drawer">
      <!-- 标题部分 -->
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin:5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
              item.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag style="margin:5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{
              item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0px;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width:100%;height: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqCancelSale, reqSkuList, reqUpdateOnSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku'
import { SkuListResponseData, records } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);

let SkuArr = ref<records>([])
let drawer = ref<boolean>(false)

let skuInfo = ref<any>({})

const getSkuList = async (pager: number = 1) => {
  pageNo.value = pager;
  let result: SkuListResponseData = await reqSkuList(pageNo.value, limit.value);
  if (result.code == 200) {
    SkuArr.value = result.data.records;
    total.value = result.data.total
  }
}
const updateSale = async (row: any) => {
  if (row.isSale == 0) {
    await reqUpdateOnSale(row.id);
    ElMessage({
      type: 'success',
      message: '上架成功'
    })
    getSkuList(pageNo.value)
  } else {
    await reqCancelSale(row.id);
    ElMessage({
      type: 'success',
      message: '下架成功'
    })
    getSkuList(pageNo.value)
  }
}
const showSkuInfo = async (rowid: number) => {
  drawer.value = true;
  let result = await reqSkuInfo(rowid);
  skuInfo.value = result.data;
}

const changePage = () => {
  getSkuList(pageNo.value)
}
const changeSize = () => {
  getSkuList();
}
const deleteSku = async (skuid:number)=>{
  let result = await reqRemoveSku(skuid);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getSkuList();
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
onMounted(() => {
  getSkuList()
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>