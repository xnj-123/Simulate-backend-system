<template>
  <div>
    <el-card style="height:80px;margin-bottom:10px">
      <el-form class="form" :inline="true">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入搜索职位的关键字" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button icon="Plus" type="primary" @click="addRole">添加职位</el-button>
      <el-table border style="margin:10px 0" :data="roleArr">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="职位名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template #="{ row }">
            <el-button icon="User" type="primary" size="small" @click="requireAlc(row)">分配权限</el-button>
            <el-button icon="Edit" type="primary" size="small" @click="editRole(row)">编辑</el-button>
            <el-button icon="Delete" type="primary" size="small" @click="deleteRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 7, 9]"
          :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '修改角色' : '添加角色'" width="800">
      <el-form :model="roleParams" :rules="rules" ref="roleform">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sure">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>权限分配</h4>
      </template>
      <template #default>
        <el-tree style="max-width: 600px" :data="menuList" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="selectArr" :props="defaultProps" ref="tree" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">保存</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermisstion } from '@/api/acl/role/index';
import { Records, RoleResponseData, RoleData, MenuList } from '@/api/acl/role/type';
import layoutStore from '@/store/modules/layout';
import { ElMessage } from 'element-plus';

let layoutstore = layoutStore();

let keyword = ref<string>('');
let pageNo = ref<number>(1);
let limit = ref<number>(5);
let total = ref<number>(0);
let dialogVisible = ref<boolean>(false);
let drawer = ref<boolean>(false)

let roleArr = ref<Records>([]);
let roleParams = reactive<RoleData>({
  roleName: ''
})
let menuList = ref<MenuList>([])
let defaultProps = reactive({
  label: 'name',
  children: 'children',
})
let selectArr = ref<number[]>([])

let roleform = ref()
let tree = ref()



const sureSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.children.length == 0) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      sureSelectArr(item.children, initArr)
    }
  });
  return initArr;
}
const requireAlc = async (row: RoleData) => {
  roleParams = row;
  let result = await reqAllMenuList((row.id as number));
  if (result.code == 200) {
    menuList.value = result.data;
    selectArr.value = sureSelectArr(menuList.value, [])
    drawer.value = true
  }
}
const cancelClick = () => {
  drawer.value = false
}
const confirmClick = async () => {
  let roleId = (roleParams.id as number)
  let arr = tree.value.getCheckedKeys();
  let arr1 = tree.value.getHalfCheckedKeys();
  let permissionId = arr.concat(arr1);
  let result: any = await reqSetPermisstion(roleId, permissionId);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '权限添加成功'
    })
    drawer.value = false;
    getRoleList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '权限添加失败'
    })
  }

}

const roleNameValidator = (rule: any, value: any, callback: any) => {
  if ((value as string).trim() == '') {
    callback('角色不能为空')
  } else {
    if (value.length < 4 || value.length > 10) {
      callback('角色名为4到10位');
    } else {
      callback();
    }
  }
}
const rules = {
  roleName: [{
    required: true, trigger: 'blur', validator: roleNameValidator
  }]
}

const getRoleList = async (pager: number = 1) => {
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, limit.value, keyword.value);
  if (result.code == 200) {
    total.value = result.data.total;
    roleArr.value = result.data.records;
  }
}
//角色增加修改
const addRole = () => {
  Object.assign(roleParams, {
    id:0,
    roleName: ''
  })
  dialogVisible.value = true;
}
const editRole = (role: RoleData) => {
  Object.assign(roleParams, role);
  dialogVisible.value = true;
}
const sure = async () => {
  await roleform.value.validate();
  let result = await reqAddOrUpdateRole(roleParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '修改成功' : '添加成功'
    })
    dialogVisible.value = false;
    getRoleList(roleParams.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '修改失败' : '添加失败'
    })
  }
}
const deleteRole = async (roleId: number) => {
  let result = await reqRemoveRole(roleId);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getRoleList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

onMounted(() => {
  getRoleList()
})

const handleSizeChange = () => {
  getRoleList();
}
const handleCurrentChange = () => {
  getRoleList(pageNo.value)
}
const reset = () => {
  layoutstore.refresh = !layoutstore.refresh;
}
const search = () => {
  getRoleList();
  keyword.value = ''
}

</script>

<style scoped lang='scss'>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>