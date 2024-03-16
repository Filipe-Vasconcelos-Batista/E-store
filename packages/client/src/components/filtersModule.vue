<script setup lang="ts">
import { computed, watch } from 'vue';
import productStore from '../stores/Products';

const store = productStore();
const { filters } = store;

const uniqueBrands = computed(() => {
  const brands = store.filtered.map((product) => product.brand);
  return [...new Set(brands)];
});

const uniqueCategories = computed(() => {
  const categories = store.filtered.map((product) => product.category);
  return [...new Set(categories)];
});

const maxPrice = computed(() => {
  return Math.max(...store.filtered.map((product) => product.price));
});

const priceRanges = computed(() => {
  const ranges = [];
  for (let i = 0; i < maxPrice.value; i += 100) {
    if (store.filtered.some((product) => product.price >= i && product.price < i + 100)) {
      ranges.push(i);
    }
  }
  return ranges;
});

/*
in this version im not usint the ratings, but i want to use it in the future so its already here
const ratings = computed(() => {
  return [1, 2, 3, 4, 5]
}) */

const filteredProducts = computed(() => {
  return store.products.filter((product) => {
    return (
      (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
      (filters.category.length === 0 || filters.category.includes(product.category)) &&
      (filters.discount.length === 0 ||
        (filters.discount.includes('true') && product.discountPercentage)) &&
      (filters.price.length === 0 ||
        filters.price.some(
          (price) => product.price >= Number(price) && product.price < Number(price) + 100
        )) &&
      (filters.rating.length === 0 ||
        filters.rating.some((rating) => product.rating >= Number(rating)))
    );
  });
});

watch(filters, () => {
  store.filtered = filteredProducts.value;
});
</script>

<template>
  <div class="big">
    <h3>Categories</h3>
    <div v-for="category in uniqueCategories" :key="category">
      <label :for="category">{{ category }}</label>
      <input type="checkbox" :id="category" :value="category" v-model="filters.category" />
    </div>
    <h3>Brands</h3>
    <div v-for="brand in uniqueBrands" :key="brand">
      <label :for="brand">{{ brand }}</label>
      <input type="checkbox" :id="brand" :value="brand" v-model="filters.brand" />
    </div>
    <h3>Price Range</h3>
    <div v-for="price in priceRanges" :key="price">
      <label :for="String(price)">{{ price }} - {{ price + 100 }}</label>
      <input type="checkbox" :id="String(price)" :value="price" v-model="filters.price" />
    </div>
  </div>
</template>
<style scoped>
div {
  background-color: white;
  justify-content: start;
}
</style>
