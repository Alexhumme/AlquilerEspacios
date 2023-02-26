<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>INGRESE</span>
        <el-button class="button" text>o registrese</el-button>
      </div>
    </template>
    <el-form autocomplete="on" status-icon label-width="120px">
      <el-form-item label="Email" :model="user">
        <el-input v-model="user.email" />
      </el-form-item>

      <el-form-item label="Contraseña">
        <el-input v-model="user.contrasenia" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">Entrar</el-button>
        <el-button type="primary" @click="signInWithGoogle">Entrar con Google</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
//import { ref, reactive } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      user: {
        email: "",
        contrasenia: "",
      },
      errMsg: "",
    };
  },
  methods: {
    login() {
      console.log("uhm");
      signInWithEmailAndPassword(
        getAuth(),
        this.user.email,
        this.user.contrasenia
      )
        .then((data) => {
          console.log("Ingresado satisfactoriamente");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Email invalido";
              break;
            case "auth/user-not-found":
              this.errMsg = "El correo con la contraseña no fueron encontrados";
              break;
            case "auth/wrong-password":
              this.errMsg = "Contraseña incorrecta";
              break;
            default:
              this.errMsg = "Correo o contraseña incorrecto";
              break;
          }
          ElMessage.error(this.errMsg)
        });
    },
    signInWithGoogle() { },
  },
};
</script>
<style>
#app,
body {
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
