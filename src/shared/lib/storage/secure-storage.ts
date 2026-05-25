import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { StateStorage } from "zustand/middleware";

const SECURE_STORE_OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const memoryStorage = new Map<string, string>();

function canUseSecureStore() {
  return (
    Platform.OS !== "web" &&
    typeof SecureStore.getItemAsync === "function" &&
    typeof SecureStore.setItemAsync === "function" &&
    typeof SecureStore.deleteItemAsync === "function"
  );
}

export const secureStateStorage: StateStorage = {
  getItem: async (name) => {
    if (!canUseSecureStore()) {
      return memoryStorage.get(name) ?? null;
    }
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name, value) => {
    if (!canUseSecureStore()) {
      memoryStorage.set(name, value);
      return;
    }
    await SecureStore.setItemAsync(name, value, SECURE_STORE_OPTIONS);
  },
  removeItem: async (name) => {
    if (!canUseSecureStore()) {
      memoryStorage.delete(name);
      return;
    }
    await SecureStore.deleteItemAsync(name, SECURE_STORE_OPTIONS);
  },
};
