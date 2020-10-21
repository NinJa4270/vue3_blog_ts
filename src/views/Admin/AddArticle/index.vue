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
        <a-form-item label="上传MD文件">
          <a-upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
            :file-list="fileList"
            :showUploadList="true"
          >
            <a-button> <upload-outlined /> Click to Upload </a-button>
          </a-upload>
        </a-form-item>
        <div class="markit">预览</div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Article } from "@/types/article";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "AddArticle",
  components: {
    UploadOutlined,
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
    const fileList = reactive([
      {
        uid: "uid", // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: "xx.png", // 文件名
        status: "done", // 状态有：uploading done error removed
        response: '{"status": "success"}', // 服务端响应内容
        linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
        xhr: "XMLHttpRequest{ ... }", // XMLHttpRequest Header
      },
    ]);
    const handleChange = (info: any) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    return {
      categories,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form,
      fileList,
      headers: {
        authorization: "authorization-text",
      },
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
