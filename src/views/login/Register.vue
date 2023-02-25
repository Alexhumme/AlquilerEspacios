<template>
    <el-form-item
      label="Email"
    >
      <el-input  v-model="email"/>
    </el-form-item>
    
    <el-form-item label="Contraseña">
      <el-input v-model="contrasena" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="register">Registrar</el-button>
      <el-button type="primary" @click="signInWithGoogle">Entrar con Google</el-button>
    </el-form-item>
</template>


<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref("");
const contrasena = ref("");
const router = useRouter(); //Obtiene una referencia del router de vue

const register = () => {
  console.log("uhm")
  createUserWithEmailAndPassword(getAuth(), email.value, contrasena.value)
    .then((data) => {
      console.log("Registrado satisfactoriamente")
      router.push('/feed')
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/feed')
    }).catch((error) => {
      console.log(error)
    })
}
</script>