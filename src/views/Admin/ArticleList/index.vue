<!--
* @fileName ArticleList
* @author yq
* @date 2020/10/20 16:20:05
!-->
<template>
  <div class="articleList-wrap">
    <div class="table-top">
      <a-button type="primary" @click="addArticle">添加</a-button>
    </div>
    <div class="table">
      <a-table :columns="columns" :data-source="data" rowKey="id" bordered>
        <template v-slot:tags="{ text: tags }">
          <span>
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "ArticleList",
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const router = useRouter()
    const addArticle = () => {
      router.push('/addArticle')
    };
    return {
      addArticle,
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "文章标题",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "所属分类",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "技术栈",
          key: "tags",
          dataIndex: "tags",
          slots: { customRender: "tags" },
        },
      ],
      data: [
        {
          id: "1",
          name: "John Brown",
          title: "JavaScript基础",
          category: "JavaScript基础",
          tags: ["nice", "developer"],
        },
        {
          id: "2",
          name: "Jim Green",
          title: "Html/Css基础",
          category: "Html",
          tags: ["loser"],
        },
        {
          id: "3",
          name: "Joe Black",
          title: "Webpack实践",
          category: "Webpack",
          tags: ["cool", "teacher"],
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
