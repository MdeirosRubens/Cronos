<template>
    <div class="box has-text-weght-bold" :style="estilos">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BoxTask',
    data () {
        return {
            estilos: {
                background: '#faf0ca'
            }
        }
    }
})
</script>
