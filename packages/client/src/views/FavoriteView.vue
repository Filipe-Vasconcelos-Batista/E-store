<script setup lang="ts">
import { useRouter } from 'vue-router';
import productStore from '../stores/Products';
import favoriteButton from '../components/favoriteButton.vue';
import cartButtons from '../components/cartButtons.vue';

const router = useRouter();
const Store = productStore();

const goToProductPage = (id: number) => {
  router.push({ name: 'ProductView', params: { id } });
};
</script>

<template>
  <div>
    <v-banner class="font-weight-bold text-xl" lines="one" text="" :stacked="false"
      ><h2>Your Favorites</h2>
    </v-banner>
    <div v-if="!Store.favorites.length" class="empty">
      <h1>No Favorites ....</h1>
      <v-btn variant="tonal" type="button" @click="router.push({ name: 'Catalog' })"
        >Return to Catalog</v-btn
      >
    </div>
    <div class="cart-items" v-else>
      <div class="cart-item" v-for="item in Store.favorites" :key="item.id">
        <div class="item-details">
          <div class="item-detailest" @click="goToProductPage(item.id)">
            <img :src="item.thumbnail" alt="image of{{ item.title }}" />
            <span>Brand: {{ item.brand }}</span>
            <span>Category: {{ item.category }}</span>
            <span>Price: $ {{ item.price }}</span>
          </div>
          <div class="buttons">
            <favoriteButton :product="item" />
            <cartButtons :product="item" />
          </div>
        </div>
      </div>
      <div class="item-details">
        <v-btn variant="tonal" type="button" @click="router.push({ name: 'Catalog' })"
          >Return to Catalog</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.buttons {
  display: flex;
}
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 22px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}
.item-detailest {
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-details img {
  width: 20%;
  height: 200px;
}

.empty {
  text-align: center;
}
</style>
