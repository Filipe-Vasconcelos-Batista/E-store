import { expect, describe, test, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import productStore from '../../../src/stores/Products';

describe('productStore', () => {
  let store;

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    setActivePinia(createPinia());
  });
  beforeEach(() => {
    store = productStore();
    localStorage.clear();
  });

  describe('addToCart', () => {
    test('adds a product to the cart', () => {
      const product = { id: 1 };
      store.addToCart(product);
      expect(store.cart).toEqual(expect.arrayContaining([expect.objectContaining(product)]));
    });
  });

  describe('removeFromCart', () => {
    test('removes a product from the cart', () => {
      const product = { id: 1 };
      store.addToCart(product);
      store.removeFromCart(1);
      expect(store.cart).not.toContain(product);
    });
  });

  describe('setFilter', () => {
    test('sets a filter', () => {
      const filterName = 'brand';
      const value = ['Nike'];
      store.setFilter(filterName, value);
      expect(store.filters[filterName]).toEqual(value);
    });
  });

  describe('addToFavorites', () => {
    test('adds a product to favorites', () => {
      const product = { id: 1 };
      store.addToFavorites(product);
      expect(store.favorites).toEqual(expect.arrayContaining([expect.objectContaining(product)]));
    });
  });

  // Tests for removeFromFavorites
  describe('removeFromFavorites', () => {
    test('removes a product from favorites', () => {
      const product = { id: 1 };
      store.addToFavorites(product);
      store.removeFromFavorites(1);
      expect(store.favorites).not.toContain(product);
    });
  });

  // Tests for resetFilters
  describe('resetFilters', () => {
    test('resets all filters', () => {
      store.setFilter('brand', ['Nike']);
      store.resetFilters();
      expect(store.filters.brand).toEqual([]);
    });
  });
});
