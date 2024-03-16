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
      v-if="!Store.favorites.some((favorite) => favorite.id === product.id)"
      @click="Store.addToFavorites(product)"
      title="Favorite"
    >
      <font-awesome-icon icon="heart" size="2x" color="grey" />
    </button>

    <button
      type="button"
      class="icon-button"
      v-if="Store.favorites.some((favorite) => favorite.id === product.id)"
      @click="Store.removeFromFavorites(product.id)"
      title="Favorited"
    >
      <font-awesome-icon icon="heart" size="2x" color="red" />
    </button>
  </div>
</template>
<style scoped>
.icon-button {
  border: none;
  background: none;
}
</style>
