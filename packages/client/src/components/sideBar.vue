<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import productStore from '../stores/Products';
import FontAwesomeIcon from '../assets/AwesomeLibrary';
import filters from './filtersModule.vue';

const Store = productStore();
const router = useRouter();
const searchTerm = ref();
const expand = ref(false);

const emit = defineEmits(['expand']);

function toggleExpand() {
  expand.value = !expand.value;
  emit('expand', expand.value);
}
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

const showComponent = ref(false);
</script>
<template>
  <aside>
    <div class="icon-text-container arrow" @click="toggleExpand()">
      <font-awesome-icon
        :icon="['fas', 'arrow-right']"
        size="2x"
        :class="{ rotate: expand, rotateBack: !expand }"
      />
      <h4 v-if="expand">Collapse</h4>
    </div>
    <div class="cart-items">
      <div
        class="icon-text-container2"
        @click="router.push({ name: 'cartView' })"
        title="Your Shopping Cart"
      >
        <font-awesome-icon icon="shopping-cart" size="2x" title="Cart" />
        <span class="number triples" v-if="Store.cart.length >= 100">{{ Store.cart.length }}</span>
        <span class="number" v-else-if="Store.cart.length >= 10">{{ Store.cart.length }}</span>
        <span class="number singles" v-else-if="Store.cart.length < 10">{{
          Store.cart.length
        }}</span>
        <h4 v-if="expand">Cart</h4>
      </div>
      <div class="icon-text-container" @click="router.push({ name: 'Catalog' })" title="Catalog">
        <font-awesome-icon :icon="['fas', 'shop']" size="2x" />
        <h4 v-if="expand">Catalog</h4>
      </div>
      <div class="search">
        <input
          class="search-input"
          v-if="expand"
          type="text"
          v-model="searchTerm"
          placeholder="Search"
        /><buton type="button" @click="search" class="search-button">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="2x" />
        </buton>
      </div>
      <div
        class="side-comp icon-text-container"
        @mouseover="showComponent = true"
        @mouseleave="showComponent = false"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="2x" />
        <h4 v-if="expand">Filters</h4>
        <div v-if="showComponent && expand" class="filter-container">
          <filters />
        </div>
      </div>
      <div
        class="icon-text-container"
        @click="router.push({ name: 'favorites' })"
        title="Favorites"
      >
        <font-awesome-icon :icon="['fas', 'heart']" size="2x" />
        <h4 v-if="expand">Favorites</h4>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.icon-text-container {
  margin-top: 12px;
  display: flex;
}
.arrow {
  margin-left: 19px;
  height: 34px;
  font-size: large;
  cursor: pointer;
}
.icon-text-container > h4 {
  margin-top: 4px;
  margin-left: 10px;
}
.icon-text-container2 {
  display: flex;
  width: 100%;
  height: 50px;
}
.icon-text-container2 > h4 {
  margin-top: 4px;
  margin-left: 10px;
}
.search {
  margin-top: 5px;
}
.search-input {
  margin-top: 2px;
  padding-top: 8px;
  width: 70%;
  height: 40px;
  border-radius: 10px 0 0 10px;
  border: 1px solid black;
  font-size: large;
}
.search-button {
  height: 35px;
  margin-top: 2px;
  border-radius: 0 10px 10px 0px;
  cursor: pointer;
}
.side-comp {
  position: relative;
  margin-top: 19px;
}

.filter-container {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: left;
  font-size: 14px;
  line-height: 2;
}

aside {
  box-shadow: 2px 0px 4px 0 rgba(30, 30, 30, 0.2);
  background-color: #fff;
  width: 260px;
  overflow-y: auto;
}

.cart-items {
  text-align: start;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  padding-bottom: 10px;
}

.number {
  position: absolute;
  top: 62px;
  left: 28px;
  color: white;
  padding: 5px;
  border-radius: 50%;
  font-size: 20px;
}
.singles {
  left: 35px;
}
.triples {
  left: singles;
  font-size: 17px;
}
.rotate {
  transition: transform 0.5s;
  transform: rotate(180deg);
}
.rotateBack {
  transition: transform 0.5s;
  transform: rotate(0deg);
}
</style>
