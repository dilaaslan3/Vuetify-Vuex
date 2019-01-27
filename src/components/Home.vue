<template>
 <v-container>
   <v-layout row wrap class="mb-2">
    <v-flex xs12 sm6 class="text-xs-center text-sm-right">
      <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
    </v-flex>
     <v-flex xs12 sm6 class="text-xs-center text-sm-left">
       <v-btn large router to="/meetup/create" class="primary">Organize Meetup</v-btn>
     </v-flex>
   </v-layout>
   <v-layout xs12 roow wrap class="text-xs-center">
     <v-carousel style="cursor: pointer">
       <!-- computedda oluşturacağım fonksiyonun adı meetups olacak çünkü önceden hardcode olarak datada yazdığım object arrayi meetups dı ve ben onu storejs de state in içine taşıdım -->
       <v-carousel-item
         v-for="item in meetups"
         :key="item.id"
         :src="item.imgUrl"
         @click="tiklanabilirSlayt(item.id)"
       >
       <div class="title">
         {{ item.title}}
       </div>
       </v-carousel-item>
     </v-carousel>
   </v-layout>
   <v-layout row wrap class="mt-2">
     <v-flex xs12 class="text-xs-center">
       <p>Join Awesome Meetups!</p>
     </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
export default {
  computed: { // vuex deki getters otomotik olarak update olduğunda çalışır
    meetups () {
      return this.$store.getters.featuredMeetups // getters ları çağırırken parantez koymadan çağırıyorum çünkü faeturedMeetups bir property
    }
  },
  methods: {
    tiklanabilirSlayt (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
 .title {
   position: absolute;
   text-align: center;
   bottom: 50px;
   right: 475px;
   color: white;
   background-color: rgba(0,0,0,0.5);
   font-size: 2em;
   padding: 20px;
 }
</style>
