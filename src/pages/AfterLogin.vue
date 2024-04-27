<template>
  <b-table striped hover :items="items"></b-table>
  <b-button @click="getData" variant="light">查詢資料</b-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const items = ref([])

const getData = async () => {
  const res = await axios.get('http://localhost:8080/user').then(
    response=>{
      const data = response.data;
      // 將查到的資料放到items裡面
      items.value = data
    },
    error=>{
      console.log('请求失败了',error.message);
      alert('查詢失敗：權限不足，請重新登入');
    }
  )
}


</script>