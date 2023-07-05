import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const useFinderStore = defineStore('counter', {
  state:() => ({
    isLogin : localStorage.getItem('access_token') ? true : false,
    eventsList : [],
    detailsList : [],
    wishlists: [],
    ticketsList : [],
    idPayment : ''
  }),

  actions: {

    changePage(page) {
      this.router.push(`/${page}`)
    },

    async handleLogin(email, password) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/users/login`,
          data: {
            email: email,
            password: password,
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.getAllEvents()

        this.changePage('')
      } catch (error) {
        console.log(error);
      }
    },

    async handleRegister(value) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/users/register`,
          data: value
        })
        this.changePage('login')
      } catch (error) {
        console.log(error);
      }
    },  
    
    async getAllEvents() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/events/getAllEvent`,
        })
        this.eventsList = data
      } catch (error) {
        console.log(error);
      }
    },  

    async getEventId(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/events/getAllEvent/${id}`,
        })
        this.eventsList = data
        this.changePage(`view-detail/${id}`);
      } catch (error) {
        console.log(error);
      }
    },

    async getWishlist() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/wislists/getWishlist`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.wishlists = data.message
        this.changePage(`wishlist`);
      } catch (error) {
        console.log(error);
      }
    }, 

    async createdWishlist(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/wislists/addWishlist/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.getWishlist()
      } catch (error) {
        console.log(error);
      }
    },


    async deleteWishlist(id) {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${BASE_URL}/wislists/deleteWishlist/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.getWishlist()
      } catch (error) {
        console.log(error);
      }
    }, 

    async getTicketslist() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/tickets/displayTickets`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.ticketsList = data.message
        this.changePage(`ticket`);
      } catch (error) {
        console.log(error);
      }
    }, 

    async createTicket(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/tickets/buyTicket/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.getTicketslist()
      } catch (error) {
        console.log(error);
      }
    },
    
    async buyTicket(id) {
      try {
        
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/tickets/generateToken/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.idPayment = id
        const ApprovePayment = this.confirmPayment;

        window.snap.pay(data.token, {
          onSuccess: function(result){
            ApprovePayment()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async confirmPayment() {
      try {
        const id = this.idPayment
        const { data } = await axios({
          method: 'PATCH',
          url: `${BASE_URL}/tickets/confirmTicket/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        this.getTicketslist()
      } catch (error) {
        console.log(error);
      }
    }

  }

})
