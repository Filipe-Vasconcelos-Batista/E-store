<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import productStore from '../stores/Products';
import cartButtons from '../components/cartButtons.vue';

const router = useRouter();
const Store = productStore();

const total = computed(() => {
  return Store.cart.reduce((accumulator, item) => accumulator + item.price, 0);
});
</script>

<template>
  <div>
    <v-banner class="font-weight-bold text-xl" lines="one" text="" :stacked="false"
      ><h2>Your Cart</h2>
    </v-banner>
    <div v-if="!Store.cart.length" class="empty">
      <h1>Empty Cart ....</h1>
      <v-btn variant="tonal" type="button" @click="router.push({ name: 'Catalog' })"
        >Return to Catalog</v-btn
      >
    </div>
    <div class="cart-items" v-else>
      <div class="cart-item" v-for="item in Store.cart" :key="item.id">
        <div class="item-details">
          <img :src="item.thumbnail" alt="image of{{ item.title }}" />
          <span>Brand: {{ item.brand }}</span>
          <span>Category: {{ item.category }}</span>
          <span>Price: $ {{ item.price }}</span>
          <cartButtons :product="item" />
        </div>
      </div>
      <div class="item-details">
        <v-btn variant="tonal" type="button" @click="router.push({ name: 'Catalog' })"
          >Return to Catalog</v-btn
        >
        <v-btn variant="tonal" type="button" @click="router.push({ name: 'CheckOut' })"
          >Checkout</v-btn
        >
        <h3>Total Price: ${{ total }}</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

.item-details img {
  width: 20%;
  height: 200px;
}

.empty {
  text-align: center;
}
@media (max-width: 1024px) {
  .item-details img {
    width: 20%;
    height: 20%;
  }
}
</style>
