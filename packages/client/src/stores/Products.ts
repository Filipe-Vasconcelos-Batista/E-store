import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface Filter {
  brand: string[];
  category: string[];
  discount: string[];
  price: string[];
  rating: string[];
}
interface ProductStoreState {
  skipOffset: number;
  limit: number;
  products: Product[];
  cart: Product[];
  filtered: Product[];
  firstTry: boolean;
  error: number;
  favorites: Product[];
  filters: Filter;
}
const productStore = defineStore({
  id: 'products',
  state: (): ProductStoreState => ({
    skipOffset: 0,
    limit: 20,
    products: [],
    cart: JSON.parse(localStorage.getItem('Cart') || '[]'),
    filtered: [],
    firstTry: true,
    error: 0,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    filters: {
      brand: [],
      category: [],
      discount: [],
      price: [],
      rating: []
    }
  }),
  actions: {
    async fetchProductsFromDB() {
      if (this.firstTry) {
        try {
          // ?limit=100 add to the fetch link to add more products
          // const response = await fetch('https://dummyjson.com/products?limit=100');
          const response = await fetch(
            `https://dummyjson.com/products?skip=${this.skipOffset}&limit=${this.limit}`
          );

          const json = await response.json();
          this.products = json.products;
          this.filtered = [...this.products];
          this.resetFilters();
          this.firstTry = false;
        } catch (error) {
          this.error = 1;
        }
      }
    },
    async goFetch() {
      try {
        this.skipOffset += 20;
        this.limit += 20;
        const response = await fetch(
          `https://dummyjson.com/products?skip=${this.skipOffset}&limit=${this.limit}`
        );
        const json = await response.json();
        this.filtered.push(...json.products);
      } catch (error) {
        console.error(error);
      }
    },
    retrieveProduct: async (id: number) => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await response.json();
      return product;
    },
    addToCart(product: any) {
      this.cart.push(product);
      localStorage.setItem('Cart', JSON.stringify(this.cart));
    },
    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.id !== id);
      localStorage.setItem('Cart', JSON.stringify(this.cart));
    },
    setFilter(filterName: 'brand' | 'category' | 'discount' | 'price' | 'rating', value: string[]) {
      this.filters[filterName] = value;
    },
    addToFavorites(product: any) {
      this.favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    removeFromFavorites(id: number) {
      this.favorites = this.favorites.filter((item) => item.id !== id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    resetFilters() {
      this.filters = {
        brand: [],
        category: [],
        discount: [],
        price: [],
        rating: []
      };
    }
  }
});

export default productStore;
