<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="common-layout">
        <el-container>
            <el-main col="10">
                <el-row>
                    <el-col :span="20">
                        <RouterView />
                    </el-col>
                </el-row>
            </el-main>

        </el-container>
    </div>

</template>

<style scoped>


    .el-row {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .el-col {
        
    }

</style>
