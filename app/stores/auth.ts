import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AuthContext {
  userId: string
  username: string
  displayName: string
  access_level: number
}

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthContext | null>(null)
  const isLoggedIn = ref(false)

  function setSession(data: AuthContext | null) {
    session.value = data
    isLoggedIn.value = !!data
  }

  return { session, isLoggedIn, setSession }
})
