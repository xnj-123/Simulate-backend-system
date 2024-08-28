<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 240px" v-model="SpuParams.tmId">
                    <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="ImageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU属性">
                <el-select style="width:240px" v-model="addorupdateAttr"
                    :placeholder="extraSaleList.length ? `还有${extraSaleList.length}个属性没有添加` : '无'">
                    <el-option v-for="item in extraSaleList" :key="item.id" :value="`${item.id}:${item.name}`"
                        :label="item.name"></el-option>
                </el-select>
                <el-button @click="addsaleattr" style="margin-left:10px" type="primary" icon="Plus"
                    :disabled="addorupdateAttr ? false : true">添加属性</el-button>
                <el-table border style="margin:10px 0" :data="saleAttrList">
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row, $index }">
                            <div class="flex gap-2">
                                <el-tag style="margin:0 5px" @close="row.spuSaleAttrValueList.splice(index, 1)"
                                    v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" closable
                                    :type="tag.type">
                                    {{ tag.saleAttrValueName }}
                                </el-tag>
                                <el-input v-if="row.flag" size="small" v-model="row.saleAttrValue" @blur="goLook(row)"
                                    style="width:100px" placeholder="请输入属性值"></el-input>
                                <el-button v-else type="primary" size="small" icon="Plus"
                                    @click="toEdit(row)"></el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button icon="Delete" type="primary" @click="deleteSaleAttr($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" @click="backSPU">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { SpuData, Trademark, SpuImg, SaleAttr, HasSaleAttr, SaleAttrValue } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue'
let $emit = defineEmits(['changeScene']);

let AllTradeMark = ref<Trademark[]>([]);
let ImageList = ref<SpuImg[]>([]);
let saleAttrList = ref<SaleAttr[]>([]);
let baseSaleAttrList = ref<HasSaleAttr[]>([])

let SpuParams = ref<SpuData>({
    category3Id: '',
    spuName: '',
    tmId: '',
    description: '',
    spuImageList: [],
    spuSaleAttrList: []
})
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
let extraSaleList = computed(() => {
    let extraSale = baseSaleAttrList.value.filter(item => {
        return saleAttrList.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return extraSale;
})
let addorupdateAttr = ref<string>('')

const initSPU = async (row: SpuData) => {
    addorupdateAttr.value = '';
    SpuParams.value = row;
    let result = await reqAllTradeMark();
    let result1 = await reqSpuImageList((row.id as number))
    let result2 = await reqSpuHasSaleAttr((row.id as number))
    let result3 = await reqAllSaleAttr();
    AllTradeMark.value = result.data;
    ImageList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl,
        }
    });
    saleAttrList.value = result2.data;
    baseSaleAttrList.value = result3.data;
}
const addinitSPU = async (c3Id: number | string) => {
    Object.assign(SpuParams.value, {
        category3Id: '',
        spuName: '',
        tmId: '',
        description: '',
        spuImageList: [],
        spuSaleAttrList: []
    })
    ImageList.value = [];
    saleAttrList.value = [];
    addorupdateAttr.value = '';
    SpuParams.value.category3Id = c3Id;
    let result = await reqAllTradeMark();
    AllTradeMark.value = result.data;
    let result3 = await reqAllSaleAttr();
    baseSaleAttrList.value = result3.data;
}

const backSPU = () => {
    $emit('changeScene', { flag: 0,params:'update' })
}
const save = async () => {
    SpuParams.value.spuImageList = ImageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: item.id,
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttrList.value;

    let result: any = await reqAddOrUpdateSpu(SpuParams.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams?'保存成功':'添加成功'
        }),
            $emit('changeScene', { flag: 0 , params:SpuParams.value.id?'update':'add' })
    }
    else {
        console.log(result)
        ElMessage({
            type: 'error',
            message: SpuParams.value.id?'保存失败':'添加失败'
        })
    }
}
defineExpose({
    initSPU, addinitSPU
})
const handleRemove = () => {
}
const handlePictureCardPreview = (file: any) => {
    dialogVisible.value = true;
    dialogImageUrl = file.url;
}
const deleteSaleAttr = (id: number) => {
    saleAttrList.value.splice(id, 1)
}
const beforeUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 <= 3) {
            return true;
        }
        else {
            ElMessage({
                type: 'error',
                message: '照片大小不得大于3MB'
            })
            return false;
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '上传文件仅为png/jpeg/gif类型'
        })
        return false;
    }
}
const addsaleattr = () => {
    const [saleattrId, saleattrName] = addorupdateAttr.value.split(':');
    let newSaleAttr = {
        baseSaleAttrId: saleattrId,
        saleAttrName: saleattrName,
        spuSaleAttrValueList: [],
    };
    saleAttrList.value.push(newSaleAttr);
    addorupdateAttr.value = '';

}

const toEdit = (row: SaleAttr) => {
    row.flag = true;
    row.saleAttrValue = '';
}

const goLook = (row: SaleAttr) => {
    let { saleAttrValue, baseSaleAttrId } = row;
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string),
    }
    if (newSaleAttrValue.saleAttrValueName.trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        row.flag = false;
        return
    }
    let repeat = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName == newSaleAttrValue.saleAttrValueName
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        row.flag = false;
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false;
}

</script>

<style scoped lang='scss'></style>