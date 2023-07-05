<script>
import { mapActions, mapState } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
    name : 'TicketPage',

    computed : {
        ...mapState(useFinderStore, ['ticketsList']),
    },

    methods: {
        ...mapActions(useFinderStore, ['getTicketslist', 'buyTicket']),

        goToPayment(id) {
            this.buyTicket(id)
        }

    },

    async created () {
        await this.getTicketslist()
    }
    

}
</script>

<template>

<section class="events">
    <div class="container">
    <h2>Tickets Page</h2>
    <!-- Event Cards -->
    <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="ticket in ticketsList" :key="ticket.id">
        <div class="card">
            <img :src="ticket.Event.imageUrl" style="height: 400px;" class="card-img-top" alt="Event Image">
            <div class="card-body">
            <h5 class="card-title">{{ ticket.Event.name }}</h5>
            <hr>
            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{ ticket.Event.description }}</p>
            <h4 class="card-title" v-if="ticket.status === 'true'">LUNAS</h4>
            <a @click="goToPayment(ticket.id)" class="btn btn-primary" style="margin-left: 10px;" v-if="ticket.status === 'false'">PAYMENT</a>
            </div>
        </div>
        </div>
    </div>
    </div>
</section>

</template>