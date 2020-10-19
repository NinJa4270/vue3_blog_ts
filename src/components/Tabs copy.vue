<!--
* @description scss
* @fileName Tabs
* @author yq
* @date 2020/10/14 18:00:08
!-->
<template>
  <div
    class="tabs"
    :style="[
      { background: background },
      { height: `${height}px` },
      { width: `${width}px` },
    ]"
  >
    <div
      class="tabs-item"
      v-for="(item, index) in list"
      :key="index"
      :style="[
        { color: defaultColor },
        { background: defaultBg },
        { lineHeight: `${height}px` },
        { fontSize: `${fontSize}px` },
      ]"
      @click="changeActive(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive ,ref} from "vue";
export default defineComponent({
  props: {
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
      default: "50",
    },
    fontSize: {
      type: [String, Number],
      default: "15",
    },
    background: {
      type: String,
      default: "#FFFFFF",
    },
    list: {
      type: Array,
      default: ["table-1", "table-2", "table-3"],
    },
    activeIndex: {
      type: [String, Number],
      default: 0,
    },
    activeColor: {
      type: String,
      default: "#FFFFFF",
    },
    activeBg: {
      type: String,
      default: "#1890ff",
    },
    defaultColor: {
      type: String,
      default: "#1890ff",
    },
    defaultBg: {
      type: String,
      default: "#FFFFFF",
    },
  },
  setup(props, { emit }) {
    let componentIndex= ref(-1)
    const changeActive = (index: number | string): void => {
      if(componentIndex.value === index) return
      let arr: any = document.getElementsByClassName("tabs-item");
      let acitveEle = arr[index];
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.color = props.defaultColor;
        arr[i].style.backgroundColor = props.defaultBg;
      }
      acitveEle.style.color = props.activeColor;
      acitveEle.style.backgroundColor = props.activeBg;
      emit("changeActive", index);
      componentIndex.value = index as number
    };
    onMounted: {
      nextTick(() => {
        changeActive(props.activeIndex);
      });
    }
    return {
      changeActive,
    };
  },
});
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-around;
  .tabs-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background-color: #ffffff !important;
    color: #000 !important;
  }
}
</style>
