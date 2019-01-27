import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // önceden home componentinin datasında bulunan meetupları statik halden alıp store js de state in içerisinde saklıyoruz
    loadedMeetups: [ // meetupları burada tanımlayarak dinamikleştiriyoruz hard code dan çıkartıyoruz
      { imgUrl: 'http://emittistanbul.com/ITE/media/ITEGroup/Content%20Page%20Heroes/visit-istanbul-640x217.jpg',
        id: '1',
        title: 'Meetup in Istanbul',
        date: '2019-01-26'
      },
      { imgUrl: 'https://i.sozcu.com.tr/wp-content/uploads/2018/04/iecrop/adanaportakalcicegifest3_16_9_1523012575-880x495.jpg',
        id: '2',
        title: 'Meetup in Adana',
        date: '2019-01-28'
      },
      { imgUrl: 'http://i.hurimg.com/i/hurriyet/75/750x422/59311ef3c03c0e3efce6f4f4.jpg',
        id: '3',
        title: 'Meetup in Izmir',
        date: '2019-01-30'
      }
    ]

  },
  mutations: {
  },
  actions: {
  },
  getters: { // statede tanımladığımız dataları getter da kullanıyoruz ,fonksiyon oluşturup get ederek çalıştıracağım
    loadedMeetups (state) { // state i parametre olarak aldım, şimdi de fonk oluşturuyorum
      return state.loadedMeetups.sort((meetupA, meetupB) => { // etkinlik tarihi sıralanmış array dönmesini bekliyorum
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    /* eğer getters i parametre almadan fonksiyonu oluştursaydım bu şekilde olacaktı
    featuredMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
      var dila = meetupA.date > meetupB.date
        return dila.slice(0, 5)
        })
     }
    */
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((herhangibirMeetup) => { // parametre olarak istediğimiz şeyi koyabiliriz bu fonksiyonda amacım loadedMeetups arrayindeki meetuplardan seçileni getirmek bunu da meetup ın id sine bakarak yapacağim
          return herhangibirMeetup.id === meetupId
        })
      }
    }
  }
})
