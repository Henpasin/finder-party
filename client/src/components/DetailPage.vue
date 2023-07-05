<script>
import { mapActions, mapState } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
    name : 'DetailPage',
    data() {
        return {
        login: {
            email: '',
            password: '',
        },
        };
    },
    computed: {
      ...mapState(useFinderStore, ['eventsList']),
    },

    methods: {
      ...mapActions(useFinderStore, ['getEventId', 'helperDate', 'changePage', 'createTicket']),

      updatePage(page) {
        this.changePage(page);
      },

      changeFormatDate(date) {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        return formattedDate;
      },

      changeFormatPrice(price) {
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(price);
        return formattedPrice;
      },

      createToMyTicket(id) {
        this.createTicket(id)
      }

    },

    async created() {
        const params = this.$router.currentRoute.value.params.id 
        await this.getEventId(params);
    }
}

</script>

<template>
  <section class="event-details">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img :src="eventsList.message.imageUrl" class="img-fluid" alt="Event Image">
        </div>
        <div class="col-md-6">
          <h2>{{eventsList.message.name}}</h2>
          <p>{{eventsList.message.description}}</p>
          <ul>
            <li><strong>Date:</strong> {{ changeFormatDate(eventsList.message.date) }}</li>
            <li><strong>Time:</strong> {{eventsList.message.time}}</li>
            <li><strong>Location:</strong> {{eventsList.message.location}}</li>
            <li><strong>Price:</strong> {{ changeFormatPrice(eventsList.message.price) }}</li>
            <!-- Add more event details as needed -->
          </ul>
          <a @click.prevent="createToMyTicket(this.$router.currentRoute.value.params.id)" class="btn btn-primary">Process Ticket</a>
          <a @click.prevent="updatePage('')" class="btn btn-primary" style="margin-left: 10px;">Home</a>
        </div>
      </div>
    </div>
  </section>
</template>