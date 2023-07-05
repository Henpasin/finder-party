<script>
import { mapActions } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
  name : 'RegisterPage',
  data() {
    return {
      register: {
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(useFinderStore, ['handleRegister', 'changePage']),

    handleSubmit() {
        this.handleRegister(this.register)
    },

    updatePage(page) {
      this.changePage(page);
    },
  }
}

</script>

<template>
  <section class="register-form">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2>Register</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="name" class="form-label">Username</label>
              <input type="text" class="form-control" v-model="register.username" required>
            </div>
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="text" class="form-control" v-model="register.phoneNumber" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" v-model="register.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="register.password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <button @click="updatePage('login')" type="button" class="btn btn-primary" style="margin-left: 10px;">Back to login</button>
          </form>
        </div>
      </div>
  </section>
</template>