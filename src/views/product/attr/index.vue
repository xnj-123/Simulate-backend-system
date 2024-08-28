<template>
  <div>
    <Category :scene="scene"></Category>

    <el-card>
      <div v-if="scene == 0">
        <el-button icon="Plus" type="primary" @click="changeAttr"
          :disabled="categoryStore.c3Id ? false : true">添加商品属性</el-button>
        <el-table border style="margin:10px 0" :data="attrArr">
          <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin:2px 3px" v-for="(attr, index) in row.attrValueList" :key="attr.id">{{ attr.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button icon="Edit" size="small" type="primary" @click="update(row)"></el-button>
              <el-popconfirm :title="`你想要删除${row.attrName}嘛`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button icon="Delete" size="small" type="warning"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>

        <el-button icon="Plus" :disabled="attrParams.attrName ? false : true" type="primary"
          @click="addAttrValue">添加属性值</el-button>
        <el-table border style="margin:10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input v-if="row.flag" v-model="row.valueName" @blur="tolook(row, $index)"
                :ref="(vc: any) => inputArr[$index] = vc"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, index }">
              <el-button type="primary" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice(index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/attr';
import { watch, ref, reactive, onBeforeUnmount, nextTick } from 'vue'

import { reqdeleteAttr, reqgetAttr } from '@/api/product/attr';
import { Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';
import { reqSaveAttr } from '@/api/product/attr';
let categoryStore = useCategoryStore();

let attrArr = ref<Attr[]>([]);
let scene = ref<number>(0);

let inputArr = ref<any>([]);

let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [
  ],
  categoryId: '',
  categoryLevel: 3,
})

watch(() => categoryStore.c3Id, () => {
  attrArr.value = [];
  if (!categoryStore.c3Id) {
    return;
  }
  getAttr();
})
//获取属性列表
const getAttr = async () => {
  let result = await reqgetAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
}


const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  })
}

const changeAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [
    ],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1;
}

const tolook = (row: AttrValue, $index: any) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }

  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });

  if (repeat) {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return;
  }
  row.flag = false;
}

const toEdit = (row: AttrValue, $index: any) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  })
}

const cancel = () => {
  scene.value = 0;
}

const save = async () => {
  let result = await reqSaveAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0;
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    });
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }

}

const deleteAttr = async (attrid: number) => {
  let result = await reqdeleteAttr(attrid);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

const update = (row: Attr) => {
  scene.value = 1;
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}

onBeforeUnmount(() => {
  //清空仓库的数据
  categoryStore.$reset();
})

</script>

<style scoped lang='scss'>
.el-card {
  margin: 10px 0;
}
</style>