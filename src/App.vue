<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetUp</router-link> <!-- router-link ile markaya tıklanabilirlik özelliği verdim -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- toolbardaki butonlar-->
        <v-btn flat v-for="item in menuItems"
        router
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- drawerdaki liste-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems"
        router
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: { // computedun içinde yazdığım her fonksiyon bir value return etmek zorunda
    menuItems () { // userın authenticated durumuna göre kullanıcıya toolbarda gerekli olan menu ıtemlarını gösterir
      let menuItems = [
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign In', link: 'signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/create' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () { // userın authenticated durumunu store gettersdaki getUser fonksiyonundaki verilere bakarak kotrol eder
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }
  }
}
</script>
