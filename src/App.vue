<template>
  <b-navbar class="widthCtrl" toggleable="lg" fixed="top">
    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div v-for="item in menu">
            <!-- vue-router，直接使用to -->
            <b-navbar-brand :to="item.to">{{ item.name }}</b-navbar-brand>
          </div>
        </b-navbar-nav>
        <b-button @click="logout" variant="light">登出</b-button>
      </b-collapse>
  </b-navbar>
  <!-- @ -> 綁定接收的事件，: -> 傳遞的資料 -->
  <router-view class="widthCtrl" :ShoppingList="ShoppingList" :account="account" @func="getData" @listFunc="addList" @clean="cleanData"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const menu = [
  {
    name: 'Home',
    to: '/'
  },
  {
    name: 'Login',
    to: '/login'
  },
  {
    name: 'After Login',
    to: '/afterLogin'
  },
  {
    name: 'Sign Up',
    to: '/signUp'
  }
]

// 登出
const logout = () => {
  localStorage.removeItem('token')
  router.push({path: '/'})
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.widthCtrl {
  max-width: 1280px;
  min-width: 320px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
