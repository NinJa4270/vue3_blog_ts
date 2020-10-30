<!--
* @fileName AddArticle
* @author yq
* @date 2020/10/20 16:20:44
!-->
<template>
  <div class="addArticle-wrap">
    <div class="form">
      <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="标题">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="form.category" placeholder="请选择分类">
            <a-select-option
              :value="item.id"
              v-for="(item, index) in categories.list"
              :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item label="技术栈">
          <div>
            <a-tag v-for="(tag, index) in tagList.list" :color="tag.color" :key="index" closable @close="handleClose(tag)">
              {{ tag.name }}
            </a-tag>
            <a-input
              v-if="tagList.inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              v-model:value="tagList.inputValue"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              v-else
              @click="showInput"
              style="background: #fff; borderStyle: dashed;"
            >
              <plus-outlined /> New Tag
            </a-tag>
          </div>
        </a-form-item>

        <a-form-item label="选择日期">
          <a-date-picker
            v-model:value="form.date"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </a-form-item>
      </a-form>
    </div>
    <Editor v-model:source="source" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, watch } from "vue";
import { Article } from "@/types/article";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Editor from "@/components/Editor.vue";
import useGetCates from "./ts/useGetCates";
import { TagList,Tag } from './ts/types'
import { randomColor } from '@/utils/utils'
export default defineComponent({
  name: "AddArticle",
  components: {
    UploadOutlined,
    Editor,
    PlusOutlined,
  },
  setup() {
    const form: Article = reactive({
      title: "1",
      category: undefined,
      date: undefined,
    });
    // 文章分类 根据接口获取
    const source = ref("### 123");
    const { categories } = useGetCates();
    const onSubmit = () => {};
    watch(source, () => {
      console.log(source.value);
    });
    const tagList:TagList = reactive({
      list:[],
      inputVisible:false,
      inputValue:''
    })
    const input:any = ref(null)
    const handleClose=(removedTag:string)=> {
      tagList.list = (tagList.list as Array<Tag>).filter(tag=> tag.name !== removedTag);
    }
    const showInput=()=> {
      tagList.inputVisible = true;
      nextTick(() => {
        input.value.focus()
      });
    }
    const handleInputConfirm=()=> {
      if (tagList.inputValue){
        if((tagList.list as Array<Tag>).every(tag=>{
          return tag.name != tagList.inputValue
        })){
          let newTag = {name:tagList.inputValue,color:randomColor()};
          console.log('newTag',newTag);
          (tagList.list as Array<Tag>).push(newTag);
        }
      }
      tagList.inputVisible = false;
      tagList.inputValue = ''
    }

    return {
      categories,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form,
      source,
      tagList,handleClose,showInput,handleInputConfirm,input
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
