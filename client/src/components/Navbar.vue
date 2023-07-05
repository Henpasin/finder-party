<script>
import { mapActions, mapState} from 'pinia'
import { useFinderStore } from '../stores/counter';

export default {
  name : 'Navbar',
  computed : {
    ...mapState(useFinderStore, ['isLogin'])
  },

  methods: {
    ...mapActions(useFinderStore, ['getWishlist', 'getTicketslist', 'changePage']),

    updatePage(page) {
        if (page == 'login') localStorage.clear();
        console.log('asd');
        this.changePage(page);
    },

    runwishlist() {
        this.getWishlist()
    },

    ticketPage() {
        this.getTicketslist()
    }

  }
}
</script>
<template>

    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">PartyFinder</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" @click.prevent="updatePage('')">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="runwishlist()">Wishlist</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="ticketPage()">My Ticket</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="updatePage('login')">{{isLogin ? 'Logout' : 'Login'}}</a>
                </li>
                </ul>
            </div>
        </nav>
        <hr>
    </div>
</template>