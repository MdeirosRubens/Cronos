<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <AllNotification />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import AllNotification from './components/AllNotification.vue';

export default defineComponent({
  name: "App",
  components: { BarraLateral, AllNotification },
  data() {
    return {
      darkModeAtivo: false
    }
  },
  methods: {
    trocarTema(darkModeAtivo: boolean) {
      this.darkModeAtivo = darkModeAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-bar: #EDF1F2;
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.dark-mode {
  --bg-bar: #333333;
  --bg-primario: #121212;
  --texto-primario: #fff;
}

.conteudo {
  background: var(--bg-primario);
}
</style>
