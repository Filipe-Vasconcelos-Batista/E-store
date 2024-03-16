<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import productStore from '../stores/Products';

const Store = productStore();
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="buttons">
    <button
      type="button"
      class="icon-button"
      v-if="!Store.cart.some((item) => item.id === product.id)"
      @click="Store.addToCart(product)"
      title="Add to Cart"
    >
      <font-awesome-icon :icon="['fas', 'cart-plus']" size="2xl" />
    </button>

    <button
      type="button"
      class="icon-button"
      v-if="Store.cart.some((item) => item.id === product.id)"
      @click="Store.removeFromCart(product.id)"
      title="Remove from Cart"
    >
      <font-awesome-icon :icon="['fas', 'cart-arrow-down']" size="2x" />
    </button>
  </div>
</template>
<style scoped>
.icon-button {
  border: none;
  background: none;
}
</style>
