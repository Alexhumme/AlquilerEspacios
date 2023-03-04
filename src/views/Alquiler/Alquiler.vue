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
            <button class="btn btn-primary btn-sm me-2" @click="toPDF(post.id)">
              Generar PDF
            </button>
            <button class="btn btn-danger btn-sm" @click="printPost(post.id)">
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
  import { jsPDF } from "jspdf";
  import autoTable from 'jspdf-autotable'

  export default {
    props: {
      posts: {
        type: Array,
        required: false
      }
    },
    data () {
      return {
        prestamo: []
      }
    },
    methods: {
      async printPost(post){
        try {
          console.log("eliminando", post)
          await Post.delete(post)
        }catch( e ) {
          console.log(e);
        }
      },
      async toPDF(id) {
        var vm = this
        var columns = [
          {title: "Titulo", dataKey: "Contenido"}
        ];
        var doc = new jsPDF('p', 'pt');

        doc.text('FORMATO DE PRÉSTAMO DE ESPACIOS INSTITUCIONALES', 80, 40);

        const data = await Post.find(id)
        const result = Object.entries(data)
        doc.setFontSize(12)

        const [espacioSoli] = result.filter(result=> result[0]==="espacioSolicitado")
        doc.text(`Espacio Solicitado: ${espacioSoli[1]}`, 30, 120);

        const [fechaSoli] = result.filter(result=> result[0]==="fechaSolicitud")
        doc.text(`Fecha Solicitud: ${fechaSoli[1]}`, 30, 150);

        const [fechaEvento] = result.filter(result=> result[0]==="fechaEvento")
        doc.text(`Fecha Evento: ${fechaEvento[1]}`, 30, 180);

        const [horaInicio] = result.filter(result=> result[0]==="horaInicio")
        doc.text(`Fecha Evento: ${horaInicio[1]}`, 30, 210);

        const [horaFinal] = result.filter(result=> result[0]==="horaFinal")
        doc.text(`Fecha Evento: ${horaFinal[1]}`, 30, 240);

        const [valAlquiler] = result.filter(result=> result[0]==="valor")
        doc.text(`Valor Alquiler: ${valAlquiler[1]}`, 30, 270);

        const [contraprestacion] = result.filter(result=> result[0]==="contraprestacion")
        doc.text(`Contraprestacion: ${contraprestacion[1]}`, 30, 300);

        const datosPersonales = result.filter((result) => {
          return (
            result[0] === "correo" ||
            result[0] === "empresa" ||
            result[0] === "telefono" ||
            result[0] === "solicitante" ||
            result[0] === "documento"
          );
        });
        doc.autoTable({
          head: columns,
          body: datosPersonales,
          startY: 340,
          // Default for all columns
          styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
          // Override the default above for the text column
          columnStyles: { text: { cellWidth: 'auto' } },
        });

        const checklist = result.filter((result) => {
          return (
            result[0] === "aire" ||
            result[0] === "iluminacion" ||
            result[0] === "paredes" ||
            result[0] === "pisos" ||
            result[0] === "puertas" ||
            result[0] === "sanitarios"
          );
        });
        doc.autoTable({
          head: columns,
          body: checklist,
          startY: doc.lastAutoTable.finalY + 15,
          rowPageBreak: 'auto',
          bodyStyles: { valign: 'top' }, 
        });


        doc.text("Observación: En ningún caso el usuario podrá colocar clavos, tornillos, cintas pegantes, ni pegamento sobre las paredes o muros. Esto para evitar el daño general y deterioro de la pintura. El usuario deberá responder por cualquier daño o pérdida parcial o total, será su responsabilidad devolver el espacio en buen estado y limpio.", 30, 270);

        doc.text("Contraprestacion", 30, 300);
        doc.text(`Contraprestacion: ${contraprestacion[1]}`, 30, 300);


        doc.save('todos.pdf');
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
  