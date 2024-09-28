import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher:any;
    Echo:any;
  }
}

export default defineNuxtPlugin(() => {
  window.Pusher = Pusher
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    wsHost:  "192.168.0.191",
    wsPort: 6001,
    cluster: 'mt1',
    forceTLS: false
  })
})