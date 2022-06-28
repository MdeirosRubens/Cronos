<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
        <cronometroTask :tempoEmSegundos="tempoEmSegundos" />
        <BotaoTask @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <BotaoTask @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cronometroTask from "./CronometroTask.vue"
import BotaoTask from "./BotaoTask.vue";

export default defineComponent({
    name: "TemporizadorTask",
    emits: ['aoTemporizadorFinalizado'],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometroTask: 0,
            cronometroRodando: false
        };
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true
            this.cronometroTask = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
            console.log("Iniciando");
        },
        finalizar() {
            this.cronometroRodando = false
            clearInterval(this.cronometroTask);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    },
    components: { cronometroTask, BotaoTask }
})
</script>