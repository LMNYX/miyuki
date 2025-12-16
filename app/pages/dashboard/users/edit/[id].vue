<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Editing {{ form.name }}</p>
      <AlertDialogRoot>
        <AlertDialogTrigger class="danger">
          Delete user
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="AlertDialogOverlay" />
          <AlertDialogContent class="AlertDialogContent">
            <AlertDialogTitle class="AlertDialogTitle">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription class="AlertDialogDescription">
              This action cannot be undone. This will permanently delete this account and remove all the data from the servers.
            </AlertDialogDescription>
            <div :style="{ display: 'flex', gap: 25, justifyContent: 'flex-end' }" style="gap: 16px;">
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                class="danger"
                @click="deleteUser"
              >
                Yes, delete account
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>

    <div class="user-editor">
      <div class="preview">
        <div class="avatar-box">
          <Avatar :size="200" :name="form._id" variant="beam" />
        </div>
      </div>

      <div class="editing">
        <label for="id">ID</label>
        <input id="id" :value="form._id" class="disabled" readonly @focus="selectAll" />

        <label for="username">Username</label>
        <input id="username" v-model="form.username" />

        <label for="name">Name</label>
        <input id="name" v-model="form.name" />

        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="0">Guest</option>
          <option value="30">Editor</option>
          <option value="60">Administrator</option>
          <option value="90">Owner</option>
        </select>

        <label for="password1">Password</label>
        <input id="password1" type="password" v-model="form.password1" placeholder="********" />

        <label for="password2">Repeat Password</label>
        <input id="password2" type="password" v-model="form.password2" placeholder="********" />

        <label for="createdat">Created</label>
        <input id="createdat" :value="form.createdAt" class="disabled noborder" readonly @focus="selectAll" />

        <label for="changedat">Last Change</label>
        <input id="changedat" :value="form.updatedAt" class="disabled noborder" readonly @focus="selectAll" />

        <p>
          <button @click="submitChanges">Submit changes</button>
        </p>

        <p v-show="errorMessage != ''" class="error-text">{{ errorMessage }}</p>
      </div>

      <div class="editing">
        <h3>
          <span>Sessions</span>
          <span class="tiny-font info-card">{{ Object.keys(sessions).length }}</span>
        </h3>
        <div class="sessions">
          <div v-for="(session, key) in sessions" :key="key" class="session">
            <div class="content">
              <span>Session </span><span>{{ `${key.substr(6, 12)}...` }}</span> <span>from {{ session.started }}</span>
              <p>{{ session.ipAddress }}</p>
            </div>
            <div>
              <button @click="deleteSession(key)">Kill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - users - editing' })

const route = useRoute();
const router = useRouter();

const form = ref({
  _id: '',
  username: '',
  name: '',
  role: 0,
  password1: '',
  password2: '',
  createdAt: '',
  updatedAt: ''
});

const errorMessage = ref('');

const { data: userInfo } = await useFetch(`/api/v1/user/fetch/${route.params.id}`, {});

const sessions = ref<Record<string, any>>({});

const fetchSessions = async () => {
  const { data } = await useFetch(`/api/v1/user/session/${route.params.id}`);
  sessions.value = data.value?.sessions ?? {};
}

await fetchSessions();

async function deleteSession(sessionKey: string) {
  try {
    await $fetch(`/api/v1/user/session/${route.params.id}/${sessionKey}/kill`, { method: 'POST' });
    sessions.value = Object.fromEntries(
      Object.entries(sessions.value).filter(([key]) => key !== sessionKey)
    );
  } catch (err) {
    console.error(err);
  }
}


if (userInfo.value?.user) {
  form.value._id = userInfo.value.user._id;
  form.value.username = userInfo.value.user.username;
  form.value.name = userInfo.value.user.name;
  form.value.role = userInfo.value.user.access_level;
  form.value.createdAt = userInfo.value.user.createdAt;
  form.value.updatedAt = userInfo.value.user.updatedAt;
}

function selectAll(event: FocusEvent) {
  const target = event.target as HTMLInputElement;
  target.select();
}

async function submitChanges() {
  const payload: Record<string, any> = {};

  if (form.value.username) payload.username = form.value.username;
  if (form.value.name) payload.name = form.value.name;
  if (form.value.role !== null) payload.role = form.value.role;
  if (form.value.password1?.trim()) payload.password1 = form.value.password1.trim();
  if (form.value.password2?.trim()) payload.password2 = form.value.password2.trim();

  try {
    await $fetch(`/api/v1/user/modify/${form.value._id}`, {
      method: 'POST',
      body: payload
    });
    router.back();
  } catch (err) {
    errorMessage.value = err.data.statusMessage;
    console.error(err);
  }
}

async function deleteUser() {
  try {
    await $fetch(`/api/v1/user/delete/${form.value._id}`, { method: 'POST' });
    router.back();
  } catch (err) {
    console.error(err);
  }
}
</script>


<style lang="scss" scoped>
.topbar
{
  display: flex;
  align-items: center;
  width: 95%;
  padding: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  button:not(.danger)
  {
    margin: 0 16px 0 0;
    border: 1px solid transparent;
    border-radius: 12px;
    
    &:hover
    {
      border: 1px solid rgba(255,255,255,0.1);
    }
  }
}

button.danger
{
  margin-left: auto;
  background: transparent;

  &:hover
  {
    border: 1px solid rgba(175, 47, 47, 0.6);
    background: rgba(175, 47, 47, 0.3);
  }
}

.user-editor
{
  width: 95%;
  display: flex;
  margin-top: 24px;

  gap: 24px;

  div.preview
  {
    margin: auto;
  }
  
  div.editing
  {
    flex: 1;
    padding: 16px;
  }
}

.avatar-box
{
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.1);
  cursOr: not-allowed;

  transition: 0.2s;

  &:hover
  {
    background: rgba(0,0,0,0.3);
  }
}

.error-text
{
  color: rgb(202, 57, 57);
}

.info-card
{
  vertical-align: middle;
  padding: 4px 8px;
  padding-left: 12px;
  background: rgba(0,0,0,0.1);
}

h3 { span { vertical-align: middle; }}

.sessions
{
  display: block;
  position: flex;
  flex-direction: column;

  .session
  {
    display: flex;
    margin: 12px 0;
    border-bottom: 1px solid rgba(255,255,255, 0.1);
    align-items: center;

    .content
    {
      flex: 1;
      padding: 24px;
      
      p
      {
        margin: 0;
        padding: 0;
        color: rgba(255,255,255,0.6);
      }
    }
    
  }
}

/* rekaui */

.AlertDialogOverlay {
  background-color: rgba(0,0,0,0.2);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.AlertDialogContent {
  background-color: rgb(24, 24, 24);
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.AlertDialogContent:focus {
  outline: none;
}

.AlertDialogTitle {
  margin: 0;
  color: white;
  font-size: 17px;
  font-weight: 500;
}

.AlertDialogDescription {
  margin-bottom: 20px;
  color: white;
  font-size: 15px;
  line-height: 1.5;
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>