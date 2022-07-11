<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <BoxTask v-if="listaEstaVazia">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </BoxTask>
        <TarefaTask v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaTask from "../components/TarefaTask.vue";
import ITarefa from "../interfaces/ITarefa"
import BoxTask from '../components/BoxTask.vue';

export default defineComponent({
    name: "App",
    components: { FormularioTarefa, TarefaTask, BoxTask },
    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>
