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
    <table class="table m-0 table">
      <thead>
        <tr>
          <th >Fecha Evento</th>
          <th >Cliente</th>
          <th >Direccion</th>
          <th >Telefono</th>
          <th >Valor</th>
          <th ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="id">
          <td>{{ post.fechaSolicitud }}</td>
          <td>{{ post.solicitante }}</td>
          <td>{{ post.direccion }}</td>
          <td>{{ post.telefono }}</td>
          <td>{{ post.valor }}</td>
          <td class="opciones">
            <el-button class="btn btn-primary btn-sm me-2" @click="toPDF(post.id)" type="info">
              Generar PDF
            </el-button>
            <el-button class="btn btn-danger btn-sm" @click="printPost(post.id)" type="danger" :icon="Delete">
              Delete
            </el-button>
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
  import moment from 'moment'
  import { Delete } from '@element-plus/icons-vue'

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
        const data = await Post.find(id)
        const result = Object.entries(data)
        const pdfWidth = 21 // ancho de la hoja
        const pdfHeight = 29.7 // alto de la hoja
        const marginR = 1.4 // margen a la derecha de la hoja
        var vm = this

        var doc = new jsPDF('p', 'cm', 'a4');

        const banner = new Image()
        banner.src = "src/img/liceo-banner.png"
        banner.onload = () => {
          // await for the image to be fully loaded            
        doc.addImage(banner,'png',marginR,0,pdfWidth-marginR*2,3)

        doc.text('FORMATO DE PRÉSTAMO DE ESPACIOS INSTITUCIONALES', pdfWidth/2, 3.5, { align : 'center' });
        doc.setFontSize(11)
        doc.setLineWidth(0.04)
        
        // 

        doc.rect(marginR, 3.9, pdfWidth-marginR*2, 1, 'S')
        const [espacioSoli] = result.filter(result=> result[0]==="espacioSolicitado")
        doc.text(`Espacio Solicitado: ${espacioSoli[1]}`, marginR+0.5, 4.5);

        // cuadros de fecha y hora

        doc.rect(marginR, 5.3, ((pdfWidth-marginR*2)/3)-0.5, 1.3)
        doc.rect(marginR+(((pdfWidth-marginR*2)/3))+0.25, 5.3, ((pdfWidth-marginR*2)/3)-0.5, 1.3)
        doc.rect(marginR+((((pdfWidth-marginR*2)/3))*2)+0.5, 5.3, ((pdfWidth-marginR*2)/3)-0.5, 1.3)

        const [fechaSoli] = result.filter(result=> result[0]==="fechaSolicitud")
        doc.text(`Fecha Solicitud: ${moment(fechaSoli[1].toDate()).format('L')}`, marginR+0.53, 6);

        const [fechaEvento] = result.filter(result=> result[0]==="fechaEvento")
        doc.text(`Fecha Evento: ${moment(fechaEvento[1].toDate()).format('L')}`, marginR+(((pdfWidth-marginR*2)/3))+0.53, 6);


        const [horaInicio] = result.filter(result=> result[0]==="horaInicio")
        doc.text(`hora inicio: ${moment(horaInicio[1].toDate()).format('LTS')}`, marginR+((((pdfWidth-marginR*2)/3))*2)+0.7, 5.8);

        const [horaFinal] = result.filter(result=> result[0]==="horaFinal")
        doc.text(`hora fin: ${moment(horaFinal[1].toDate()).format('LTS')}`, marginR+((((pdfWidth-marginR*2)/3))*2)+0.7, 6.3);
        
        //

        const ArrdatosPersonales = result.filter((result) => {
          return (
            result[0] === "correo" ||
            result[0] === "empresa" ||
            result[0] === "telefono" ||
            result[0] === "solicitante" ||
            result[0] === "documento"
          );
        });
        const datosPersonales = {
          correo: ArrdatosPersonales.find((dato)=>dato[0]==="correo")[1],
          empresa: ArrdatosPersonales.find((dato)=>dato[0]==="empresa")[1],
          telefono: ArrdatosPersonales.find((dato)=>dato[0]==="telefono")[1],
          solicitante: ArrdatosPersonales.find((dato)=>dato[0]==="solicitante")[1],
          documento: ArrdatosPersonales.find((dato)=>dato[0]==="documento")[1],
        }
        const [valAlquiler] = result.filter(result=> result[0]==="valor")
        const [contraprestacion] = result.filter(result=> result[0]==="contraprestacion")
        doc.autoTable({
          head: [
            [{ 
              content:'Datos del cliente',
              colSpan: 4,
              styles: { halign: 'center' }
           }]
          ],
          body: [
            [
              { content:'Nombre', styles: { fontStyle: 'bold' }},
              datosPersonales.solicitante,
              { content:'Correo', styles: { fontStyle: 'bold' }},
              datosPersonales.correo
            ],
            [
              { content:'Documento', styles: { fontStyle: 'bold' }},
              datosPersonales.documento,
              { content:'Telefono', styles: { fontStyle: 'bold' }},
              datosPersonales.telefono
            ],
            [
              {
                content : 'Empresa que representa',
                styles : { fontStyle: 'bold' },
                colSpan : 2
              },
              {
                content : datosPersonales.empresa,
                colSpan : 2
              },

            ],
          ],
          foot: [
              [
                { content : 'Valor del alquiler' },
                { content : "$"+valAlquiler[1], styles : { fontStyle : 'normal' } },
                { content : 'Contraprestacion' },
                { content : "$"+contraprestacion[1], styles : { fontStyle : 'normal' } }
              ],
          ],
          startY: 7,
          tableWidht: pdfWidth-marginR*2,
          // Default for all columns
          styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
          // Override the default above for the text column
          columnStyles: { text: { cellWidth: 'auto' } },
        });
       
        //

        doc.rect(marginR, 11.2, pdfWidth-marginR*2, 2.22)
        doc.text(
          'Observación: En ningún caso el usuario podrá colocar clavos, tornillos, cintas pegantes, ni pegamento sobre las paredes o muros. Esto para evitar el daño general y deterioro de la pintura. El usuario deberá responder por cualquier daño o pérdida parcial o total, será su responsabilidad devolver el espacio en buen estado y limpio.'
          , marginR+0.5, 11.7, {
            maxWidth: pdfWidth-(marginR+0.5)*2
          });

        
        //
        const checklist = result.filter((result) => {
          return (
            result[0] === "aire" ||
            result[0] === "iluminacion" ||
            result[0] === "paredes" ||
            result[0] === "pisos" ||
            result[0] === "puertas" ||
            result[0] === "sanitarios" ||
            result[0] === "ventanas"
          );
        });
        doc.autoTable({
          head: [
            [{ content: "Inventario de entrega", colSpan: 3, rowSpan: 1, styles: { halign: 'center' } }],
            [{ content: 
              `Se hace entrega del ${ espacioSoli[1] } con los siguientes elementos. Es de recomendar que se debe entregar limpio y con todos los elementos en buen estado`,
              colSpan: 3, rowSpan: 1, 
              styles: { 
                textColor : '#000000',
                fontStyle : 'normal', 
                fillColor: '#ffffff'
              }
            }],
            ["Inventario","Estado", "Observaciones"],
          ],
          body: checklist,
          startY: 13.8,
          rowPageBreak: 'auto',
          bodyStyles: { valign: 'top' }, 
        });
        

        //
        
        doc.rect(marginR, 22, pdfWidth-marginR*2, 4.3)
        doc.text("COMPROMISO DE AUTORIZACION DE DATOS PERSONALES", pdfWidth/2, 22.7, { align : 'center' })
        doc.text(
          'Me comprometo a cumplir fielmente los siguientes requisitos para el uso del espacio. Autorizo de forma clara, expresa e inequívoca a la institución Educativa Almirante Padilla el tratamiento de mis datos personales, de acuerdo con los parámetros de la ley 1581 de 2012, con la finalidad de que sea autorizado el uso del espacio. En caso de requerir modificar, actualizar o suprimir datos personales debe escribir al correo: rectoriaalpadilla@gmail.com'
          , marginR+0.5, 23.4, {
            maxWidth: pdfWidth-(marginR+0.5)*2,
          }
        )
        doc.text("Firma: _________________________________________________", marginR+0.5, 26)

        //

        doc.rect(marginR, 26.5, pdfWidth-marginR*2, 1)
        doc.text(
          `
Quien entrega: ___________________________________________________________
# de Cedula y Teléfono: ____________________________________________________
          `, marginR+0.5, 26.44)

        //

        doc.rect(marginR, 27.5, pdfWidth-marginR*2, 1)
        doc.text(
          `
Quien recibe: ____________________________________________________________
# de Cedula y Teléfono: ____________________________________________________
          `, marginR+0.5, 27.44)

        doc.save(`${espacioSoli[1]}_${datosPersonales.solicitante}.pdf`);
        };
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
<style scoped>
.table{
  width: 100%;
  font-size: small;
  color: rgb(87, 87, 87);
  text-align: left;
}
.table tr{
  box-shadow: 0px 1px rgb(219, 219, 219);
}
.table td, th{
  
  padding: 10px 0px;
}
.table .opciones{
  text-align: right;
}
</style>