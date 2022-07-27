<template>
    <BoxTask>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}

            </div>
            <div class="column">
                <cronometroTask :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTask>
</template>

<script lang="ts">

import { defineComponent, PropType } from "vue";
import cronometroTask from "./CronometroTask.vue";
import ITarefa from "..//interfaces/ITarefa";
import BoxTask from "./BoxTask.vue";

export default defineComponent({
    name: 'TarefaTask',
    emits: ['aoTarefaClicada'],
    components: {
        cronometroTask,
        BoxTask
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada (): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    },
    //computed: {
    //    tempoGasto () :string {
    //        return new Date(this.tarefa.duracaoEmSegundos = 1000)
    //            .toISOString()
    //            .substring(11, 8)
    //    }
    //}
});
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>

