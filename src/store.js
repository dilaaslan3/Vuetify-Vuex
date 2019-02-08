import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
    ],
    user: null, // en başta hiçbir user olmayacağı için user ı null yaptım
    /* {
      id: 'sadhajhda',
      registeredMeetups: ['sdhfjshf']
    } */
    loading: false, // sonradan eklenecek
    error: null // sonradan eklenecek

  }, // statedeki verilere direk olarak müdahele edemeyiz bu yüzden mutationsları kullanırız
  mutations: { //  createMeetup isimli bir fonk. tanımlıyoruz  actionsta da aynı isimli fonk tanımlayacağım bu fonksiyon state ve payload isimli iki parametre alıyor. state parametresi statedeki verilere erişebilmek için. payload ise actionstan gelecek ve yeni meetupın verilerini tutacak. burada createMeetup fonk. amacı yeni oluşturulan meetupı meetup listesine ekleyebilmek
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
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
        time: payload.time
      } // üstte tanımladığım meetup objectiyle post isteği attım (push ile)
      firebase.database().ref('meetups').push(meetup) // meetups pathine yolluyorum çünkü bir meetup create edildiğinde direk olarak meetups page açılsın istiorum
        .then(data => {
          const key = data.key
          commit('createMeetup', { // istek başarılı olduğunda commit etsin diye post isteği attığım meetupı mutationsdaki createMeetup a gönderiyorum
            ...meetup, // meetup objesine meetupın id si olacak firebasein otomatik olarak oluşturduğu key i
            id: key // spread operator yardımı ile ekliyorum. Böylece view meetupa tıkladığımda meetupın idsi olduğu için görüntüleyebileceğim
          })
          console.log(data)
        }).catch(
          error => {
            console.log(error)
          }
        )
    }, // yeni bi user kaydolduğundaki olcak olan olaylar state e veri ekleyecek bi durum old. dolayı signUserUp fonksiyonunu actionsa yazıyorum
    signUserUp ({ commit }, payload) { // bu payload Signup compenentindeki onSignup methodunun içindeki userInfo dan gelir
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password) // firebase Authentication bağladım
        .then(
          user => { // bağladıktan sonra statede tuttuğum formatta userların bilgileri gibi bide newUser için giriyorum
            const newUser = {
              id: user.uid,
              registeredMeetups: [] // yeni userın kayıtlı olduğu meetup olmayacağı için boş array
            }
            commit('setUser', newUser) // mutationsdaki setUserın payloaduna newUser ı yolluyorum
          }
        ).catch(
          error => {
            console.log(error) // hata olursa hata mesajı döndüm
          }
        )
    },
    signUserIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [] // yeni userın kayıtlı olduğu meetup olmayacağı için boş array
            }
            commit('setUser', newUser)
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
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
    },
    getUser (state) { // state deki user verilerini get ederek
      return state.user
    }
  }
})
