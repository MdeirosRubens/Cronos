<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaTask v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxTask v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </BoxTask>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/FormularioTarefa.vue';
import TarefaTask from "./components/TarefaTask.vue";
import ITarefa from "./interfaces/ITarefa"
import BoxTask from './components/BoxTask.vue';

export default defineComponent({
  name: "App",
  components: { BarraLateral, FormularioTarefa, TarefaTask, BoxTask },
  data() {
    return {
      tarefas: [] as ITarefa[],
      darkModeAtivo: false
    }
  },
  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema (darkModeAtivo: boolean) {
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
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.dark-mode {
   --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background: var(--bg-primario);
}

</style>
