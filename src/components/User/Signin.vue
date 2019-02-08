<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-layout>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn type="submit">Sign in</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser // gettersdaki getUser ı buraya Signup componentinin içerisine çağırdım
    } // return edilen value watchdaki user fonksiyonuna parametre olarak gönderilir
  },
  watch: { // computeddaki userı izliyorum , dolaylı olarak statedeki userı izlemiş oluyorum
    user (value) { // kayıt işleminde herhangi bir sorun yoksa uygulama anasayfasına kullanıcıyı route ettim
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      const userInfo = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUserIn', userInfo)
    }
  }
}
</script>

<style scoped>

</style>
