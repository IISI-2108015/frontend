<template>
  <b-form @submit="handleLogin" style="width: 600px">
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-default">UserName:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="input-1"
          v-model="loginForm.userName"
          placeholder="Enter userName"
          required
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-default">Password:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="input-2"
          v-model="loginForm.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-col>
    </b-row>
    <b-button type="submit" variant="primary">註冊</b-button>
  </b-form>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = ref({
  userName: '',
  password: ''
});

const handleLogin = () => {
  const token = ''
  let userName = loginForm.value.userName
  let password = loginForm.value.password

  // 帳號密碼需驗證不能為空
  if (userName !== '' && password !== '') {
    axios.post('http://localhost:8080/user', loginForm.value).then(
      response=>{
        axios.post('http://localhost:8080/loginAuth', loginForm.value).then(
          response=>{
            const data = response.data;
            // console.log(response)
            if(data.accessToken){
              loginForm.value.token = data.accessToken;
            }else{
              console.log('登入失敗')
            }
            localStorage.setItem("token",data.accessToken)	//保存token到localStorage
            
            // cookie當中有token被設置才能改變路由
            if (localStorage.token && loginForm.value.token) {
              router.push({path: '/afterLogin'})
            }
          }
        )
      },
      error=>{
        if(error.response.status == '406') {
          alert('帳號重複，請重新輸入');
        }
      }
    )
  } else {
    alert('帳號密碼不能為空')
  }
}
  
  
</script>
  