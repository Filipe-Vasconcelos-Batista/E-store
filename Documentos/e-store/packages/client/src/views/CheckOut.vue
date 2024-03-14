<script setup lang="ts">
import { ref, computed } from 'vue';

import productStore from '../stores/Products';

const { cart } = productStore();
const delivery = ref<number>(0);
const total = computed(() => {
  return (
    Number(cart.reduce((accumulator, item) => accumulator + item.price, 0)) + Number(delivery.value)
  );
});

const fullname = ref<string>('');
const email = ref<string>('');
const address = ref<string>('');
const city = ref<string>('');
const state = ref<string>('');
const zip = ref<string>('');
</script>

<template>
  <div>
    <v-banner class="font-weight-bold text-xl" lines="one" text="" :stacked="false"
      ><h2>Checkout</h2>
    </v-banner>
    <div class="checkout">
      <div class="form spaces">
        <form ref="form">
          <label for="fname">Full Name</label><br />
          <input
            class="border-black"
            required
            type="text"
            id="fname"
            v-model="fullname"
            placeholder="John M. Doe"
          /><br />
          <label for="email">Email</label><br />
          <input
            required
            type="text"
            id="email"
            v-model="email"
            placeholder="john@example.com"
          /><br />
          <label for="adr">Address</label><br />
          <input
            required
            type="text"
            id="adr"
            v-model="address"
            placeholder="542 W. 15th Street"
          /><br />
          <label for="city">City</label><br />
          <input required type="text" id="city" v-model="city" placeholder="New York" /><br />
          <label for="state">State/country</label><br />
          <input required type="text" id="state" v-model="state" placeholder="NY" /><br />
          <label for="zip">Zip-code</label><br />
          <input required type="text" id="zip" v-model="zip" placeholder="10001" /><br />
        </form>
      </div>
      <div class="delivery spaces">
        <form action="">
          <label for="airSender">Choose a Delivery Method:</label><br />
          <input
            required
            type="radio"
            id="carrier"
            name="airSender"
            value="10"
            v-model="delivery"
          />
          <label for="carrier">Carrier - $10</label><br />
          <input
            required
            type="radio"
            id="freight"
            name="airSender"
            value="50"
            v-model="delivery"
          />
          <label for="freight">Freight - $50</label><br />
          <input required type="radio" id="train" name="airSender" value="100" v-model="delivery" />
          <label for="train">Train - $100</label><br />
          <input required type="radio" id="plane" name="airSender" value="200" v-model="delivery" />
          <label for="plane">Plane - $200</label><br />
        </form>
      </div>
      <div class="information spaces">
        <div class="product-list">
          <label for="items">Your products:</label><br />
          <p id="items" v-for="item in cart" :key="item.id">{{ item.title }}-${{ item.price }}</p>
          <br />
        </div>
        <div class="price spaces">
          <label for="price">Final price:</label><br />
          <h4 id="price">${{ total }}</h4>
          <br />
          <v-btn variant="tonal" type="submit">Checkout</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
div .spaces {
  box-shadow: 0 0 6px 6px #e7e7e7;
  padding-bottom: 20px;
}
.form {
  font-size: larger;
  width: 60%;
  justify-content: center;
}
label {
  justify-self: center;
}
.checkout {
  display: flex;
  margin: 0px 20px 0 20px;
  justify-content: space-between;
}
input[type='text'] {
  border: 2px solid black;
  border-radius: 4px;
  padding: 6px;
  width: 99%;
  height: 29px;
  box-sizing: border-box;
}
@media (max-width: 1024px) {
  .form {
    width: 100%;
  }
  .checkout {
    margin: 0px 20px 0 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
