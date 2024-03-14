<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productStore from '../stores/Products';
import cartButtons from '../components/cartButtons.vue';
import favoriteButton from '../components/favoriteButton.vue';

const router = useRouter();
const route = useRoute();
const Store = productStore();

const selectedProduct = ref();

onMounted(async () => {
  const id = Number(route.params.id);
  selectedProduct.value = await Store.retrieveProduct(id);
});
</script>
<template>
  <div>
    <v-btn variant="tonal" type="button" @click="router.push({ name: 'Catalog' })"
      >Back to Catalog</v-btn
    >
    <div class="product" v-if="selectedProduct">
      <div class="product-image">
        <img :src="selectedProduct.thumbnail" alt="Image of {{ selectedProduct.title }}" />
      </div>
      <div class="product-details">
        <h1>{{ selectedProduct.title }}</h1>
        <p>Brand: {{ selectedProduct.brand }}</p>
        <p>Description: {{ selectedProduct.description }}</p>
        <h2>Price: $ {{ selectedProduct.price }}</h2>
        <div class="buttons">
          <cartButtons :product="selectedProduct" />
          <favoriteButton :product="selectedProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
}
.product {
  background-color: #fafafa;
  box-shadow: 0 0 17px 6px #e7e7e7;
  padding: 10px;
  display: flex;
}
.product-details {
  margin-left: 20px;
}
</style>
