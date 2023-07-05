<script>
import { mapActions } from 'pinia';
import { useFinderStore } from '../stores/counter';

export default {
  name : 'LoginPage',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(useFinderStore, ['handleLogin', 'changePage']),

    handleSubmit() {
      this.handleLogin(this.login.email, this.login.password);
    },

    updatePage(page) {
        this.changePage(page);
    }

  }
}

</script>

<template>
<section class="login-form">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="login.email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="login.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <button @click="updatePage('register')" type="button" class="btn btn-primary ms-2">Register</button>
        <hr>
        <label for="password" class="form-label">Login Using Discord</label>
        <div class="d-flex justify-content-start  align-items-center">
          <a id="login" href="https://discord.com/api/oauth2/authorize?client_id=1115498718783881236&redirect_uri=http%3A%2F%2Flocalhost%3A53134%2F&response_type=token&scope=identify%20email" class="btn btn-primary btn-lg btn-block d-flex align-items-center gap-2">
            <i class="fab fa-discord fs-5"></i>
            <span class="fs-6">Login with Discord</span>
          </a>
        </div>
      </form>
    </div>
  </div>
</section>

</template>