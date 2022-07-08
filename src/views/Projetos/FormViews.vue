<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ALTERA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
    name: 'FormViews',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        };
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = "";
            this.store.commit(NOTIFICAR, {
                titulo: 'Novo projeto salvo',
                texto: 'Prontinho, seu projeto já está disponível',
                tipo: TipoNotificacao
            })
            this.$router.push('/projetos')
        },
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})

//function ALTERA_PROJETO(ALTERA_PROJETO: any, arg1: { id: string; nome: string; }) {
//throw new Error("Function not implemented.");
//}

//function ADICIONA_PROJETO(ADICIONA_PROJETO: any, nomeDoProjeto: string) {
//throw new Error("Function not implemented.");
//}
</script>

