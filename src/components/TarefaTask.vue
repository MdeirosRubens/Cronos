<template>
    <BoxTask>
        <div class="columns">
            <div class="column is-7">{{tarefa.descricao || 'Tarefa sem descrição'}}</div>
            <div class="column">
                <cronometroTask :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
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
    components: {
    cronometroTask,
    BoxTask
},
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
});

</script>

