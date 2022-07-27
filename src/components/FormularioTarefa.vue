<template>
    <div class="box">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorTask @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TemporizadorTask from "./TemporizadorTask.vue";

export default defineComponent({
    name: "FormularioTask",
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorTask
    },
    setup(props, { emit }) {
        const store = useStore(key)
        const descricao = ref("")
        const idProjeto = ref("")

        const projetos = computed(() => store.state.projeto.projetos)

        const finalizarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = '';
        }

        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    }
});
</script>

<style scoped>
.button {
    margin-left: 8px;
}

.box {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>