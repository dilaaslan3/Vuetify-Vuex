<template>
 <v-container>
  <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-3">
    <v-flex xs12>
      <v-card>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs5 sm4 md3>
              <v-img
                :src="meetup.imgUrl"
                height="150px"
              ></v-img>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
                <div class="purple--text">
                  <div class="headline pt-0">{{ meetup.title }}</div>
                  <div>{{ meetup.date }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat :to="'/meetups/' + meetup.id">
                  View Meetups
                  <v-icon right>arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
export default {
  computed: {
    meetups () { // burada bütün meetuplar listeleneceği için getterdaki loadedMeetups property sini çağırdım
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style scoped>

</style>
