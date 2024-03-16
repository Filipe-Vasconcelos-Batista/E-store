<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import productStore from '../stores/Products';
import FontAwesomeIcon from '../assets/AwesomeLibrary';
import filters from './filtersModule.vue';

const showComponent = ref(false);
const Store = productStore();
const router = useRouter();
const searchTerm = ref();

const reRouting = (name: string) => {
  router.push({ name });
  showComponent.value = false;
};
watch(searchTerm, (newVal) => {
  // If the searchTerm is empty, reset the filtered array
  if (newVal === '') {
    Store.filtered = [...Store.products];
  }
});
const search = () => {
  Store.filtered = [];

  const filteredProducts = Store.products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.value.toLowerCase());
  });

  Store.filtered = filteredProducts;
};
</script>
<template>
  <nav>
    <div class="cart-items">
      <div @click="reRouting('Catalog')" title="Catalog">
        <font-awesome-icon :icon="['fas', 'shop']" size="2x" />
      </div>
      <div @click="reRouting('favorites')" title="Favorites">
        <font-awesome-icon :icon="['fas', 'heart']" size="2x" />
      </div>
      <div class="search">
        <input class="search-input" type="text" v-model="searchTerm" placeholder="Search" /><button
          type="button"
          @click="search"
          class="search-button"
        >
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </div>
      <div class="icon-singles" @click="reRouting('cartView')" title="Your Shopping Cart">
        <p>
          <font-awesome-icon icon="shopping-cart" size="2x" title="Cart" /><span
            class="number triples"
            v-if="Store.cart.length >= 100"
            >{{ Store.cart.length }}</span
          >
          <span class="number" v-else-if="Store.cart.length >= 10">{{ Store.cart.length }}</span>
          <span class="number singles" v-else-if="Store.cart.length < 10">{{
            Store.cart.length
          }}</span>
        </p>
      </div>
      <div class="side-comp" title="filters" @click="showComponent = !showComponent">
        <font-awesome-icon :icon="['fas', 'bars']" size="2x" />
      </div>
    </div>
    <div v-if="showComponent" class="filter-container">
      <filters />
    </div>
  </nav>
</template>

<style scoped>
.side-comp {
  position: relative;
  margin-right: 6px;
}

.filter-container {
  position: absolute;
  top: 22px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 2;
  overflow-y: auto;
  max-height: 100vh;
}

nav {
  box-shadow: 2px 0px 4px 0 rgba(30, 30, 30, 0.2);
  background-color: #fff;
  width: 100vw;
}

.cart-items {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.icon-container {
  position: relative;
  display: inline-block;
  top: -10px;
  margin-left: 5px;
}

.number {
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 5px;
  border-radius: 50%;
  font-size: 15px;
}
.search {
  width: 55%;
}
.search-input {
  width: 80%;
  height: 44%;
  margin-top: 2px;
  border-radius: 22px 0 0 22px;
  box-shadow: 0 1px 0 0 #e6e6e6;
}
.search-button {
  height: 50%;
  margin-top: 2px;
  border-radius: 0 10px 10px 0px;
  box-shadow: 2px 2px 2px 0 #e6e6e6;
}
.singles {
  right: 4px;
}
.triples {
  top: 11px;
  font-size: 12px;
  right: -1px;
}
</style>
