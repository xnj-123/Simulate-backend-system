<template>
  <el-card>
    <el-form :inline="true">
        <el-form-item label="一级标题">
          <el-select :disabled="scene==0?false:true" style="width:280px" v-model="catestore.c1Id" @change="hander">
            <el-option v-for="(c1) in catestore.c1Arr" :value="c1.id" :label="c1.name" :key="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级标题">
          <el-select :disabled="scene==0?false:true" style="width:280px" v-model="catestore.c2Id" @change="hander1">
            <el-option v-for="(c2) in catestore.c2Arr" :value="c2.id" :label="c2.name" :key="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级标题">
          <el-select :disabled="scene==0?false:true" style="width:280px" v-model="catestore.c3Id">
            <el-option v-for="(c3) in catestore.c3Arr" :value="c3.id" :label="c3.name" :key="c3.id" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script setup lang='ts'>
    import { onMounted } from 'vue';
    import usecatestore from '@/store/modules/attr'

    defineProps(['scene'])
    let catestore = usecatestore();

    onMounted(()=>{
        catestore.getcateList1();
    })

    const hander = ()=>{
        catestore.c2Id='';
        catestore.c3Id='';
        catestore.c3Arr=[];
        catestore.getcateList2();
    }

    const hander1 = ()=>{
        catestore.c3Id = '';
        catestore.getcateList3();
    }
</script>

<style scoped lang='scss'>

</style>