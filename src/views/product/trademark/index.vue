<template>
  <el-card>
    <el-button @click="opendialog" type="primary" icon="Plus" style="margin:10px 0">添加品牌</el-button>
    <el-table border :data="trademarkList">
      <el-table-column width="80" label="序号" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="warning" icon="Edit" size="small" @click="updataTrademark(row)" ></el-button>
          <el-popconfirm :title="`你确认删除${row.tmName}嘛？`" icon="Delete" width='250px'  @confirm="DeleteTrademark(row.id)">
            <template #reference>
              <el-button icon="Delete" size="small" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <div class="demo-pagination-block" style="margin:10px 0">
      <el-pagination v-model:current-page="pageNo" :pager-count="7" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout=" prev, pager, next, jumper ,->, sizes,total" :total="total"
        @current-change="getTrademarkList" @size-change="getTrademarkList" />
    </div>
  </el-card>

  <el-dialog v-model="dialogTableVisible" :title="trademark.id ? '修改品牌' : '添加品牌'" width="800">
    <el-form :model="trademark" :rules="rules" ref="formSure">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input style="width:80%" v-model="trademark.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">

        <el-upload class="avatar-uploader" action="api/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <UploadFilled />
          </el-icon>
        </el-upload>


      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';

import { reqAddTrademark, reqDeleteTrademark, reqTrademarkList } from '@/api/product/trademark/index'
import { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'

import type { UploadProps } from 'element-plus'

import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let dialogTableVisible = ref(false);

let trademarkList = ref<Records>([])

let trademark = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

let formSure = ref();

const DeleteTrademark = async (id:number)=>{
  let result = await reqDeleteTrademark(id);
  if(result.code == 200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getTrademarkList(trademarkList.value.length > 1 ? pageNo.value :pageNo.value-1)
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
} 

const tmnamevalidate = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('品牌名至少为2位'))
  }
}
const logourltmnamevalidate = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}

const rules = reactive({
  tmName: [{
    required: true, trigger: 'blur', validator: tmnamevalidate,
  }],
  logoUrl: [{
    required: true, validator: logourltmnamevalidate,
  }]
})

const updataTrademark = (row: any) => {
  nextTick(() => {
    formSure.value.clearValidate('tmName');
    formSure.value.clearValidate('logoUrl');
  })
  dialogTableVisible.value = true;
  trademark.tmName = row.tmName;
  trademark.logoUrl = row.logoUrl;
  trademark.id = row.id;
}

const opendialog = () => {
  nextTick(() => {
    formSure.value.clearValidate('tmName');
    formSure.value.clearValidate('logoUrl');
  })

  dialogTableVisible.value = true;
  trademark.tmName = '';
  trademark.logoUrl = '';
  trademark.id = '' || undefined;
}

const cancel = () => {
  dialogTableVisible.value = false;
}

const submit = async () => {
  await formSure.value.validate()

  dialogTableVisible.value = false;
  let result = await reqAddTrademark(trademark);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: trademark.id ? '修改成功' : '添加成功',
    })
    getTrademarkList(trademark.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: 'error',
      message: trademark.id ? '修改失败' : '添加失败'
    })
  }

}

const getTrademarkList = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqTrademarkList(pageNo.value, limit.value);
  if (result.code == 200) {
    total.value = result.data.total
    trademarkList.value = result.data.records;
  }
}

onMounted(() => {
  getTrademarkList();
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile
) => {
  trademark.logoUrl = response.data;
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage({
        type: 'error',
        message: '图片大小超过4MB'
      })
      return false
    } else {
      return true
    }
  }
  else {
    ElMessage({
      type: 'error',
      message: '上传文件不为jpeg,png与gif'
    })
    return false
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>