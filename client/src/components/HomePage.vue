<script>
import { mapActions, mapState } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
  name : 'HomePage',
  data() {
    return {
    };
  },

    computed: {
        ...mapState(useFinderStore, ['eventsList'])
    },

    methods: {
        ...mapActions(useFinderStore, ['getAllEvents', 'getEventId', 'createdWishlist']),  

        viewDetails(id) {
          this.getEventId(id)
        },

        createdNewWishlist(id) {
          this.createdWishlist(id)
        }

      },

    async created() {
        await this.getAllEvents();
    }
}

</script>

<template>
<section class="hero">
  <div class="container">
    <h1>Welcome to PartyFinder</h1>
    <p>Goodbye reality, Hello party!</p>
  </div>
</section>

<!-- Search Section -->
<section class="search">
  <div class="container">
    <div class="row">
      <div class="col-md-12 my-4 d-flex align-items-center justify-content-center">
        <div class="input-group">
        <input type="text" class="form-control me-2" placeholder="Search.." >
        <button class="btn btn-primary btn-block" style="width: 150px;" @click="searchVehicles">Search</button>
        </div>
      </div>
    </div>
    <hr>
  </div>
</section>
  
 <!-- Events Section -->
<section class="events">
  <div class="container">
    <h2>Upcoming Events</h2>
    <!-- Event Cards -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="eventlist in eventsList.message" :key="eventlist.id">
        <div class="card">
          <img :src="eventlist.imageUrl" style="height: 400px;" class="card-img-top" alt="Event Image">
          <div class="card-body">
            <h5 class="card-title">{{eventlist.name}}</h5>
            <hr>
            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{eventlist.description}}</p>
            <a @click.prevent="viewDetails(eventlist.id)" class="btn btn-primary">View Details</a>
            <a @click.prevent="createdNewWishlist(eventlist.id)" class="btn btn-primary" style="margin-left: 20px; ">Wishlist</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>