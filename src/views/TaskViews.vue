<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <BoxTask v-if="listaEstaVazia">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </BoxTask>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TarefaTask v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index"
            @aoTarefaClicada="selecionarTarefa" />
        <ModalComponent :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
                </div>
            </template>
            <template v-slot:rodape>
                <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </template>
        </ModalComponent>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaTask from "../components/TarefaTask.vue";
import BoxTask from '../components/BoxTask.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import ModalComponent from '@/components/ModalComponent.vue';

export default defineComponent({
    name: "App",
    components: { FormularioTarefa, TarefaTask, BoxTask, ModalComponent },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length == 0
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("");

        //const tarefas = computed(() =>
        //    store.state.tarefas.filter(
        //        (t) => !filtro.value || t.descricao.includes(filtro.value)
        //    )
        //);

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefas),
            store,
            filtro
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    }
});
</script>
