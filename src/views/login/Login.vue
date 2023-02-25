<template>
  <el-form-item
    label="Email"
  >
    <el-input  v-model="email"/>
  </el-form-item>
  
  <el-form-item label="Contraseña">
    <el-input v-model="contrasena" />
  </el-form-item>

  <p v-if="errMsg">{{ errMsg }}</p>

  <el-form-item>
    <el-button type="primary" @click="register">Entrar</el-button>
    <el-button type="primary" @click="signInWithGoogle">Entrar con Google</el-button>
  </el-form-item>
</template>


<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref("");
const contrasena = ref("");
const errMsg = ref(); //Mensajes de errores generados por firebase
const router = useRouter(); //Obtiene una referencia del router de vue

const register = () => {
  console.log("uhm")
  signInWithEmailAndPassword(getAuth(), email.value, contrasena.value)
    .then((data) => {
      console.log("Registrado satisfactoriamente")
      router.push('/')
    }).catch((error) => {
      console.log(error.code);
      switch ( error.code ) {
        case "auth/invalid-email":
          errMsg.value = "Email invalido"
          break;
        case "auth/user-not-found":
          errMsg.value = "El correo con la contraseña no fueron encontrados"
          break;
        case "auth/wrong-password":
          errMsg.value = "Contraseña incorrecta"
          break;
        default:
          errMsg.value = "Correo o contraseña incorrecto"
          break;
      }
    })
}

const signInWithGoogle = () => {

}
</script>