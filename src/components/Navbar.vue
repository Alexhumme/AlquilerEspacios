<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0"><img src="../img/liceo-banner.png" alt="Logo Liceo" class="banner"></el-menu-item>
      <div class="flex-grow" />
        <el-menu-item index="1">
            <RouterLink to="/">Mostrar todo</RouterLink>
        </el-menu-item>
        <el-menu-item index="2">
            <RouterLink to="/newEspacio">Agregar</RouterLink>
        </el-menu-item>
      <el-sub-menu index="3">
        <template #title>Cuenta</template>
        <el-menu-item index="2-1">
            <RouterLink to="/about">About</RouterLink>
        </el-menu-item>
        <el-menu-item index="2-2">
          <a @click="logout" v-if="isLoggedIn">Salir</a>
        </el-menu-item>
        
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { routerKey, RouterLink } from 'vue-router'
  import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
  import { useRouter } from 'vue-router'
  
  const router = useRouter(); 

  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const isLoggedIn = ref(false);
  
  let auth;
  onMounted( () => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })
  })

  const logout = () => {
    signOut(auth).then(() => {
      router.push('/login')
    })
  }
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  .banner {
    height: 50px;
    width:350px
  }
  </style>
  