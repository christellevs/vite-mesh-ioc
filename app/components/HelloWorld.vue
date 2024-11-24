<template>
    <h1>{{ message }}</h1>

    <Btn
        class="Btn"
        kind="primary"
        :label="`count is ${count}`"
        @click="increment()" />

    <RouterLink
        to="/about"
        title="Go to About">
        <Btn
            class="Btn"
            kind="primary"
            label="Go to  About" />
    </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HelloWorldManager } from '../managers/HelloWorldManager';

export default defineComponent({

  inject: {
    helloWorld: {
      from: 'helloWorld',
      default: null as HelloWorldManager | null,
    },
  },
  
  computed: {
  
    message(this: { helloWorld: HelloWorldManager }) {
      return this.helloWorld.message;
    },
    
    count(this: { helloWorld: HelloWorldManager }) {
      return this.helloWorld.count;
    },
    
  },
  
  methods: {
  
    increment(this: { helloWorld: HelloWorldManager }) {
      this.helloWorld.incrementCount();
    },
    
  },
  
});
</script>

<style scoped>
.Btn {
  color: white;
  margin: var(--sp2);
}
</style>
