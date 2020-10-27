<!--
* @fileName Editor
* @author yq
* @date 2020/10/27 16:09:06
!-->
<template>
  <div class="editor">
    <a-textarea
      class="input"
      :value="source"
      @input="$emit('update:source', $event.target.value)"
      placeholder="Hellow! guys"
      :rows="4"
    />
    <vue3-markdown-it class="marked" :source="source"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "Editor",
  props: ["source"],
  emits: ["update:source"],
  setup(props, { emit }) {
    return {
    };
  },
});
</script>

<style scoped lang="scss">
.editor {
  display: flex;
  background-color: #eeeeee;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #000000;
  .input {
    min-height: 400px;
    flex: 1;
  }
  .marked {
    background-color: #ffffff;
    margin-left: 10px;
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
