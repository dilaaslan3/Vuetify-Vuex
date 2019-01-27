import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import CreateMeetup from './components/Meetup/CreateMeetup.vue'
import Meetups from './components/Meetup/Meetups.vue'
import Profile from './components/User/Profile.vue'
import Signin from './components/User/Signin.vue'
import Signup from './components/User/Signup.vue'
import Meetup from './components/Meetup/Meetup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Home,
      component: Home
    },
    {
      path: '/meetup/create',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/meetups',
      name: Meetups,
      component: Meetups
    },
    {
      path: '/meetups/:id',
      props: true, // meetup sayfasında props kullanabilmek için props u routerda true yapmam gerekti
      name: 'Meetup',
      component: Meetup
    },
    {
      path: '/profile',
      name: Profile,
      component: Profile
    },
    {
      path: '/signin',
      name: Signin,
      component: Signin
    },
    {
      path: '/signup',
      name: Signup,
      component: Signup
    }
  ]
})
