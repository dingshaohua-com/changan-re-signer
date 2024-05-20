<script setup lang="ts">
import { ref } from 'vue';

const file = ref();
const filePath = ref();
const fileInput = ref();
const dowonload = ref();
const handleFileChange = (event) => {
  file.value = event.target?.files;
  filePath.value = event.target?.value;
};

const resigner = async () => {
  // 拼接参数
  const formData = new FormData();
  formData.append('file', file.value[0]);
  // 开始上传
  const res = await api.resigner(formData);
  dowonload.value = res.dowonload;
}
</script>

<template>
  <div class="home">
    <div>
      <label for="fileInput" class="ipt-label">
        <div v-if="filePath">{{ filePath }}</div>
        <div v-else>请上传文件</div>
      </label>
      <input id="fileInput" type="file" ref="fileInput" @change="handleFileChange" hidden>
    </div>
    <a-button @click="resigner" v-if="file">开始转换</a-button>
    <div v-if="dowonload">转换完成：<a :href="dowonload">{{ dowonload }}</a></div>
  </div>
</template>

<style scoped>
.ipt-label {
  background-color: red;
  height: 30px;
  width: 300px;
  display: block;
}
</style>
