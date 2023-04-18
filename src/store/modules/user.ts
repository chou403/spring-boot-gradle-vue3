import { defineStore } from "pinia";
import { store } from "@/store";

interface userType {
  token?: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    token:''
  }),
  actions: {

  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
