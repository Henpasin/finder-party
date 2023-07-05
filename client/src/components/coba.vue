<script>
  import { defineComponent } from 'vue';
  import { useFinderStore } from '@/stores/counter';
  
  export default defineComponent({
    name: 'coba',
    setup() {
      const counterStore = useFinderStore();
  
      const logout = () => {
        // Lakukan logika logout, misalnya menghapus token dari state atau mengirim permintaan ke server
        counterStore.resetToken();
        // Redirect ke halaman login
        router.push({ name: 'Login' });
      };
  
      return {
        username: counterStore.username,
        avatarUrl: counterStore.avatarUrl,
        logout,
      };
    },
  });
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-discord-gray text-white flex-col">
      <div class="text-2xl">Welcome to the dashboard,</div>
      <div class="text-4xl mt-3 flex items-center font-medium">
        <img :src="avatarUrl" class="rounded-full w-12 h-12 mr-3" />
        <div>{{ username }}</div>
      </div>
      <a @click="logout" class="text-sm mt-5">Logout</a>
    </div>
  </template>
  