<template>
  <div>
    <el-card style="height:80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" style="width:240px" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px 0" >
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger" :disabled="selectId.length === 0 ? true : false" @click="removeSome">批量删除</el-button>
      <el-table border style="margin:10px 0" :data="UserArr" @selection-change="changeSelect">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用户名字" prop="name"></el-table-column>
        <el-table-column label="用户名称" prop="username"></el-table-column>
        <el-table-column label="用户角色" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" fixed="right" width="300px">
          <template #="{ row, $index }">
            <el-button size="small" type="primary" icon="User" @click="addRole(row)">添加角色</el-button>
            <el-button size="small" type="primary" icon="Edit" @click="UpdateUser(row)">编辑</el-button>
            <el-popconfirm width="220" confirm-button-text="删除" @confirm="deleteUser(row.id)" cancel-button-text="取消"
              icon="InfoFilled" icon-color="#626AEF" :title="`你确定要删除${row.name}吗？`">
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 7, 9]"
          :background="true" layout="prev, pager, next, jumper ,->, sizes,total" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>

      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ UserParams.id ? '修改用户信息' : '添加用户信息' }}</h4>
        </template>
        <template #default>
          <el-form :model="UserParams" :rules="rules" ref="Userform">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="UserParams.name"></el-input></el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input v-model="UserParams.username"></el-input></el-form-item>
            <el-form-item label="用户密码" v-if="!UserParams.id" prop="password">
              <el-input v-model="UserParams.password"></el-input></el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" @click="saveUser()">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </template>
      </el-drawer>
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配用户角色</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户名称">
              <el-input disabled :value="UserParams.username"></el-input>
            </el-form-item>
            <el-form-item label="角色列表">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                全选
              </el-checkbox>
              <el-checkbox-group v-model="assignRole" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" @click="saveRole">保存</el-button>
          <el-button @click="cancel2">取消</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { AllRole, Records, SetRoleData, User } from '@/api/acl/user/type'
import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSetUserRole, reqSelectUser,reqUserInfo } from '@/api/acl/user'
import { ElMessage } from 'element-plus';
import uselayoutStore from '@/store/modules/layout';
let layoutStore = uselayoutStore();
let pageNo = ref<number>(1);
let limit = ref<number>(5);
let total = ref<number>(40);
let drawer = ref<boolean>(false);
let drawer1 = ref<boolean>(false);
let checkAll = computed(() => allRole.value.length === assignRole.value.length)
let isIndeterminate = ref<boolean>(false)
let selectId = ref<User[]>([])
let keyword = ref<string>('')

let UserArr = ref<Records>([])
let UserParams = reactive<User>({
  id: 0,
  username: '',
  password: '',
  name: '',
})

let allRole = ref<AllRole>([])
let assignRole = ref<AllRole>([])

let Userform = ref();

const search = ()=>{
  getUser();
  keyword.value = '';
}
const reset = ()=>{
  layoutStore.refresh = !layoutStore.refresh;
}

const removeSome =async ()=>{
  let data:number[] = selectId.value.map(item=>{return item.id as number});
  let result:any = await reqSelectUser(data);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:'批量删除成功'
    });
    getUser();
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}

const saveRole = async () => {
  let data: SetRoleData = {
    userId: (UserParams.id as number),
    roleIdList: assignRole.value.map(item => {
      return (item.id as number)
    })
  }
  let result = await reqSetUserRole(data);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加角色成功'
    })
    drawer1.value = false;
    getUser(pageNo.value);
  } else {
    ElMessage({
      type: 'error', message: '添加失败'
    })
  }

}
const cancel2 = () => {
  drawer1.value = false
}

let changeSelect = (value:any) => {
  selectId.value = value;
}

const deleteUser = async (spuid: number) => {
  let result = await reqRemoveUser(spuid);
  if (result.code == 200) {
    ElMessage({
      type: 'success', message: '删除成功'
    })
    getUser();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

const nameValidator = (rule: any, value: any, callback: any) => {
  if ((value as string).trim() == '') {
    callback('不能为空');
  } else {
    if (value.length < 4) {
      callback('不能小于四位');
    } else if (value.length > 8) {
      callback('不能超过8位')
    }
    else {
      callback();
    }
  }
}
const rules = {
  name: [{
    required: true, trigger: 'blur', validator: nameValidator
  }],
  username: [{
    required: true, trigger: 'blur', validator: nameValidator
  }],
  password: [{
    required: true, trigger: 'blur', validator: nameValidator
  }]
}

const addRole = async (user: User) => {
  Object.assign(UserParams, user)
  allRole.value = [];
  assignRole.value = [];
  let result = await reqAllRole(user.id as number);
  if (result.code == 200) {
    allRole.value = result.data.allRolesList;
    assignRole.value = result.data.assignRoles;
    drawer1.value = true;
  }
}
const handleCheckAllChange = (val: boolean) => {
  assignRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

const getUser = async (pager: number = 1) => {
  pageNo.value = pager
  let result = await reqUserInfo(pageNo.value, limit.value,keyword.value);
  if (result.code == 200) {
    total.value = result.data.total;
    UserArr.value = result.data.records;
  }
}
const addUser = () => {
  drawer.value = true;
  Object.assign(UserParams, {
    id: 0,
    username: '',
    password: '',
    name: '',
  })
}
const UpdateUser = (row: User) => {
  drawer.value = true;
  Object.assign(UserParams, row)
}
const saveUser = async () => {
  await Userform.value.validate();
  let result = await reqAddOrUpdateUser(UserParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: UserParams.id ? '修改成功' : '添加成功'
    })
    drawer.value = false;
    getUser((UserParams.id) ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: UserParams.id ? '修改失败' : '添加失败'
    })
  }
}
const cancel = () => {
  drawer.value = false;
}

onMounted(() => {
  getUser()
})
const handleSizeChange = () => {
  getUser();
}
const handleCurrentChange = () => {
  getUser(pageNo.value);
}
</script>

<style scoped lang='scss'>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>