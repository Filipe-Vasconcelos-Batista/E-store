<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import productStore from '../stores/Products';
import favoriteButton from '../components/favoriteButton.vue';
import cartButtons from '../components/cartButtons.vue';

const router = useRouter();
const Store = productStore();
const loading = ref();

const goToProductPage = (id: number) => {
  router.push({ name: 'ProductView', params: { id } });
};

onMounted(async () => {
  loading.value = true;
  await Store.fetchProductsFromDB();
  loading.value = false;

  let canFetch = true; // Flag to control the execution of Store.goFetch()
  let debounceTimer; // Variable to hold the debounce timer

  document.addEventListener('scroll', async () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalDocumentHeight = document.documentElement.scrollHeight * 0.75;

    if (scrollTop + windowHeight >= totalDocumentHeight && canFetch) {
      canFetch = false; // Set the flag to false to prevent Store.goFetch() from being called again
      await Store.goFetch();

      debounceTimer = setTimeout(() => {
        canFetch = true; // Reset the flag after 2 seconds
      }, 1000); // 2000 milliseconds = 2 seconds
    }
  });
});
</script>

<template>
  <v-container class="spacing-playground pa-6 bg-white max-w-7xl mx-auto pt-10 px-6" fluid>
    <v-banner class="font-weight-bold text-xl" lines="one" text="" :stacked="false"
      ><h2>Our Catalog</h2>
    </v-banner>
    <div class="loading" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="loading" v-if="Store.error === 1">
      <div><h1>Failed to load Please refresh</h1></div>
    </div>
    <div v-if="!Store.filtered.length && !Store.firstTry" class="empty">
      <h1>Nothing matches your search...</h1>
    </div>
    <v-row no-gutters>
      <v-col v-for="product in Store.filtered" :key="product.id">
        <div class="product">
          <v-card class="mx-auto rounded-lg">
            <div @click="goToProductPage(product.id)">
              <v-img
                class="align-end text-white"
                height="200"
                :src="product.thumbnail"
                alt="{{product.title}} Image"
                cover
              >
              </v-img>
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-subtitle class="pt-4"> Rating:{{ product.rating }} </v-card-subtitle>

              <v-card-text>
                <div>Brand: {{ product.brand }}</div>

                <div>Price: $ {{ product.price }}</div>
              </v-card-text>
            </div>
            <v-card-actions>
              <v-btn> <cartButtons :product="product" /></v-btn>
              <v-btn> <favoriteButton :product="product" /> </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
}
v-container {
  background-color: #f2f2f2;
}
.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.product {
  flex-basis: 16%;
  margin: 3px;
  padding: 16px;
  cursor: pointer;
  margin-top: 4px;
  width: 350px;
}
.product img {
  width: 250px;
  height: 220px;
}
@media (max-width: 1024px) {
  .desktop {
    display: none;
  }

  .product {
    width: 250px;
  }
}
@media (max-width: 569px) {
  .product {
    width: 400px;
  }
}
</style>
