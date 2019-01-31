import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // önceden home componentinin datasında bulunan meetupları statik halden alıp store js de state in içerisinde saklıyoruz
    loadedMeetups: [ // meetupları burada tanımlayarak dinamikleştiriyoruz hard code dan çıkartıyoruz
      { imgUrl: 'http://emittistanbul.com/ITE/media/ITEGroup/Content%20Page%20Heroes/visit-istanbul-640x217.jpg',
        id: '1',
        title: 'Meetup in Istanbul',
        date: '2019-01-26',
        time: '19.30',
        location: 'Istanbul',
        description: 'Awesome Meetup in Istanbul'
      },
      { imgUrl: 'https://i.sozcu.com.tr/wp-content/uploads/2018/04/iecrop/adanaportakalcicegifest3_16_9_1523012575-880x495.jpg',
        id: '2',
        title: 'Meetup in Adana',
        date: '2019-01-28',
        location: 'Adana',
        time: '19.30',
        description: 'Awesome Meetup in Adana'
      },
      { imgUrl: 'http://i.hurimg.com/i/hurriyet/75/750x422/59311ef3c03c0e3efce6f4f4.jpg',
        id: '3',
        title: 'Meetup in Izmir',
        date: '2019-01-30',
        location: 'Izmir',
        time: '19.30',
        description: 'Awesome Meetup in Izmir'
      }
    ]

  }, // statedeki verilere direk olarak müdahele edemeyiz bu yüzden mutationsları kullanırız
  mutations: { //  createMeetup isimli bir fonk. tanımlıyoruz  actionsta da aynı isimli fonk tanımlayacağım bu fonksiyon state ve payload isimli iki parametre alıyor. state parametresi statedeki verilere erişebilmek için. payload ise actionstan gelecek ve yeni meetupın verilerini tutacak. burada createMeetup fonk. amacı yeni oluşturulan meetupı meetup listesine ekleyebilmek
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  }, // actionsın mutationstan farkı state i değişirmek yerine state e commit yapar yani yeni veriler ekler bunu da mutations üzerinden sağlar
  actions: { // commit default bir parametredir ikinci prmtre olan payload ise this.$store.dispatch('createMeetup', meetupData) daki meetupData payloada geliyor
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imgUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        id: 'dfghjklş'
      } // const meetup hiç oluşturmadan direk payloadu mutationsa commit ('createMeetup', payload) yaparak da gönderebilirdim
      commit('createMeetup', meetup) // ancak bu durumda payloaddan habersiz olacaktım bu yüzden meetup değişkeni oluşturarak gelen meetupData yani payload değişkenini actionsta da elimde tutmuş oluyorum
    }
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
