<script>
import { mapActions, mapState } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
    name : 'WishlistPage',
    computed: {
      ...mapState(useFinderStore, ['wishlists']),
    },

    methods: {
      ...mapActions(useFinderStore, ['getWishlist' ,'getEventId', 'deleteWishlist']),

      viewDetails(id) {
        this.getEventId(id)
      },

      destroyWishlist(id) {
        this.deleteWishlist(id)
      },
    },

    async created() {
      await this.getWishlist();
    }
}

</script>

<template>

<section class="events">
  <div class="container">
    <h2>Wishlist Page</h2>
    <!-- Event Cards -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="wishlist in wishlists" :key="wishlist.id">
        <div class="card">
          <img :src="wishlist.Event.imageUrl" style="height: 400px;" class="card-img-top" alt="Event Image">
          <div class="card-body">
            <h5 class="card-title">{{ wishlist.Event.name }}</h5>
            <hr>
            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{ wishlist.Event.description }}</p>
            <a @click.prevent="viewDetails(wishlist.Event.id)" class="btn btn-primary">View Details</a>
            <a @click.prevent="destroyWishlist(wishlist.id)" class="btn btn-primary" style="margin-left: 10px; ">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>
