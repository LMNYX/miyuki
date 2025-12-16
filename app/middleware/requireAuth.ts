export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    const requiredLevel = to.meta.accessLevel as number | undefined

    if (
    requiredLevel !== undefined &&
    (auth.session?.access_level ?? 0) < requiredLevel
    ) {
    throw createError({
        statusCode: 403,
        statusMessage: 'You don\'t have enough permissions to access this!',
        fatal: true,
    })
    }
})
