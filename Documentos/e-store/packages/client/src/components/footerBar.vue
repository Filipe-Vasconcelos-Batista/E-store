<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <footer>
    <div class="socials-container">
      <p>Follow us on our socials:</p>
      <div class="icons">
        <p>
          <font-awesome-icon class="icon link" :icon="['fab', 'tiktok']" size="3x" />
          <font-awesome-icon class="icon link" :icon="['fab', 'facebook']" size="3x" />
          <font-awesome-icon class="icon link" :icon="['fab', 'instagram']" size="3x" />
        </p>
      </div>
      <div class="newletter-container">
        <label for="email">Subscribe to our newsletter:</label>
      </div>
      <div class="newsletter">
        <input id="email" class="border-2" type="text" placeholder="Your email" />
        <v-btn class="px-8" variant="tonal" type="button">Subscribe</v-btn>
      </div>
    </div>
    <div class="links">
      <h3>Quick Links:</h3>
      <p class="link" @click="router.push({ name: 'Catalog' })">Catalog</p>
      <p class="link" @click="router.push({ name: 'favorites' })">Favorites</p>
      <p class="link" @click="router.push({ name: 'cartView' })">Cart</p>
      <p class="link">About us</p>
    </div>

    <div class="other">
      <div class="adress">
        <h4>Our Adress</h4>
        <p>Somewhere road number 32 Postalcode-2252, Ohaio Canada</p>
      </div>
      <div class="trademark"></div>
      <h4>Trademark</h4>
      <p>Trademarked by our company 2021</p>
    </div>
  </footer>
</template>
<style scoped>
.link {
  cursor: pointer;
}
.icon {
  margin-left: 5px;
}
footer {
  background-color: #fafafa;
  flex-basis: 18%;
  box-shadow: 0 0 15px 10px #e6e6e6;
  display: flex;
  justify-content: space-between;
  margin: 0 6px 0 6px;
}
@media (max-width: 1024px) {
  footer {
    display: grid;
  }
}
</style>
