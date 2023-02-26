<template>

    <!-- <el-table :data="posts" style="width: 100%">
      <el-table-column label="Fecha Evento" prop="fechaSolicitud" />
      <el-table-column label="Cliente" prop="solicitante" />
      <el-table-column label="Dirección" prop="direccion" />
      <el-table-column label="Telefono" prop="telefono" />
      <el-table-column label="Valor" prop="valor" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Buscar..." />
        </template>
        <template #default="scope">
          <router-link :to="`/editEspacio/Ci2d3edY2xdWumhoU56x`">
            <el-button size="small"
            >Editar</el-button>
            </router-link>
          <el-button
            size="small"
            type="danger"
            @click="deletePost"
            >Borrar</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->

    <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th >Fecha Evento</th>
          <th >Cliente</th>
          <th >Direccion</th>
          <th >Telefono</th>
          <th >Valor</th>
          <th >Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="id">
          <td>{{ post.fechaSolicitud }}</td>
          <td>{{ post.cliente }}</td>
          <td>{{ post.direccion }}</td>
          <td>{{ post.telefono }}</td>
          <td>{{ post.valor }}</td>
          <td>
            <router-link :to="`/edit/${post.id}`">
              <button class="btn btn-primary btn-sm me-2">
                Edit
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="printPost(post)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  </template>
  
  <script>
  import { Post } from '@/service'

  export default {
    props: {
      posts: {
        type: Array,
        required: false
      }
    },
    data () {
      return {
        title: 'List post'
      }
    },
    methods: {
      printPost(post){
        console.log(post)
      }
    },
    setup: () => {
    const deletePost = Post.delete
    return { deletePost }
    }
  }
  /* import { computed, ref } from 'vue'
  import Post from '@/service'

  export default {
    props: {
      posts : {
        type: Array,
        required: false
      }
    },
    data() {

    },
    setup: () => {
      const deletePost = Post.delete
      return {deletePost}
    }, */
    /* methods: {
      const search = ref('')
      const filterTableData = computed(() =>
        tableData.filter(
          (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
        )
      )

      const handleEdit = (index: number, row: User) => {
        console.log(index, row)
      }
      const handleDelete = (index: number, row: User) => {
        console.log(index, row)
      }
    } */
  
  /* interface User {
    date: string
    name: string
    address: string
    tel: string
    valor: string
  } */
  
  /* const tableData: User[] = [
    {
      date: '2016-05-03',
      name: 'Mario Brito',
      address: 'Cra 12 # 21 - 44',
      tel: '300522362',
      valor: '50.000'
    },
    {
      date: '2016-05-02',
      name: 'Oneida Pinto',
      address: 'Calle 54 Albania',
      tel: '312412362',
      valor: '100.000'
    },
    {
      date: '2016-05-04',
      name: 'David Fernandez',
      address: 'Los Nogales',
      tel: '300142232',
      valor: '34.000'
    },
    {
      date: '2016-05-01',
      name: 'Maria Mendoza Perez',
      address: 'Calle 35 # 21 22',
      tel: '312132362',
      valor: '503.000'
    },
  ] */
  </script>
  