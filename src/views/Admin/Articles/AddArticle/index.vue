<!--
* @fileName AddArticle
* @author yq
* @date 2020/10/20 16:20:44
!-->
<template>
  <div class="addArticle-wrap">
    <div class="form">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="标题">
          <a-input v-model:value="title" />
        </a-form-item>
        <a-form-item label="分类">
          <a-select v-model:value="category" placeholder="请选择分类">
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
            <a-tag
              v-for="(tag, index) in tags"
              :color="tag.color"
              :key="index"
              closable
              @close="handleClose(tag)"
            >
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
      </a-form>
    </div>
    <Editor v-model:source="source" />
    <div class="btn">
      <a-button type="primary" @click="add">添加</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, watch } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Editor from "@/components/Editor.vue";
import useGetCates from "./ts/useGetCates";
import { TagList, Tag, Article } from "./ts/types";
import { randomColor } from "@/utils/utils";
import server from "@/utils/axios";
export default defineComponent({
  name: "AddArticle",
  components: {
    UploadOutlined,
    Editor,
    PlusOutlined,
  },
  setup() {
    const form: Article = reactive({
      title: "",
      category: undefined,
      tags: [],
      source: "",
    });
    // 文章分类 根据接口获取
    const { categories } = useGetCates();
    const onSubmit = () => {};
    const tagList: TagList = reactive({
      list: [],
      inputVisible: false,
      inputValue: "",
    });
    const input: any = ref(null);
    const handleClose = (removedTag: string) => {
      form.tags = (form.tags as Array<Tag>).filter(
        (tag) => tag.name !== removedTag
      );
    };
    const showInput = () => {
      tagList.inputVisible = true;
      nextTick(() => {
        input.value.focus();
      });
    };
    const handleInputConfirm = () => {
      if (tagList.inputValue) {
        if (
          (form.tags as Array<Tag>).every((tag) => {
            return tag.name != tagList.inputValue;
          })
        ) {
          let newTag = { name: tagList.inputValue, color: randomColor() };
          (form.tags as Array<Tag>).push(newTag);
        }
      }
      tagList.inputVisible = false;
      tagList.inputValue = "";
    };
    const add = async () => {
      await server.request({
        url: "/api/addArticle",
        method: "post",
        data: { ...form },
      });
    };

    return {
      categories,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...toRefs(form),
      tagList,
      handleClose,
      showInput,
      handleInputConfirm,
      input,
      add,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
