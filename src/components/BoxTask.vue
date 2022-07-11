<template>
    <div class="box has-text-weght-bold">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BoxTask',
});
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>