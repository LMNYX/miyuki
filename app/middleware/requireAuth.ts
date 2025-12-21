export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()
    const requiredLevel = to.meta.accessLevel as number | undefined

    if (
    requiredLevel !== undefined &&
    (auth.session?.access_level ?? 0) < requiredLevel
    ) {
        return navigateTo('/dashboard')
    }
})
