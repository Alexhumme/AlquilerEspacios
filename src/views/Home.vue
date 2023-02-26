<script>
import Alquiler from './Alquiler/Alquiler.vue';
import Navbar from '../components/Navbar.vue';
import { Post } from '@/service'
import { Timestamp } from "@firebase/firestore";


export default {
  name: 'Home',
  components: { Alquiler },
  data () {
    return {
      posts: []
    }
  },
  async created() {
    const querySnapshot = await Post.all()
    this.posts = querySnapshot.docs.map((doc) => {
      //console.log(doc.data().fechaSolicitud.Timestamp.toDate())
      //console.log(Timestamp.fromDate(doc.data().fechaSolicitud).toDate())
      //YYYYconsole.log(doc.data().fechaSolicitud.timestamp.toDate())
      return {...doc.data(), fechaSolicitud: new Intl.DateTimeFormat(['ban', 'id']).format(doc.data().fechaSolicitud.toDate()), id: doc.id}
    })
  },
  methods: {

  }
}
</script>

<template>
    <main>
      <el-header>
          <Navbar />
      </el-header>

      <el-card class="box-card">
        <div class="text item">
          <Alquiler :posts="posts"/>
        </div>
      </el-card>
    </main>
</template>


