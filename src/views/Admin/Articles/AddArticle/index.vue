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
              :value="item.value"
              v-for="(item, index) in categories"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="技术栈">
          123
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
import { defineComponent, reactive, ref, watch } from "vue";
import { Article } from "@/types/article";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Editor from "@/components/Editor.vue";
export default defineComponent({
  name: "AddArticle",
  components: {
    UploadOutlined,
    Editor,
  },
  setup() {
    const form: Article = reactive({
      title: "1",
      category: undefined,
      date: undefined,
    });
    // 文章分类 根据接口获取
    const categories = [
      {
        value: "js",
        label: "js",
      },
      {
        value: "webpack",
        label: "webpack",
      },
      {
        value: "html/css",
        label: "html/css",
      },
    ];
    const source = ref("### 123");
    const onSubmit = () => {};
    watch(source,()=>{
      console.log(source.value)
    })
    return {
      categories,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form,
      source,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
