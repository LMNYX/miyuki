<template>
  <div>
    <p>Users</p>
    <table>
      <tr>
        <th>Username</th>
        <th>Name</th>
        <th>Role</th>
        <th>Creation Date</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(user, index) in usersListing.users" :key="index">
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ convertAccessLevelToString(user.access_level) }}</td>
        <td>{{ user.createdAt }}</td>
        <td><button>Nothing</button></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})
useHead({ title: "dashboard - users" });

function convertAccessLevelToString(accessLevel:number)
{
  if(accessLevel < 30)
    return 'Guest';
  if(accessLevel < 60)
    return 'Editor';
  if(accessLevel < 90)
    return 'Administrator';
  if(accessLevel > 90)
    return 'Superadministrator';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = useAuthStore()

const {data: usersListing} = await useFetch('/api/v1/user/get');
</script>

<style lang="scss" scoped>
table, th, td {
  border: none;
  padding: 8px 16px;
  text-align: left;
}
table
{
  width: 95%;
}

th
{
  color: #7c7c7c;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
</style>
