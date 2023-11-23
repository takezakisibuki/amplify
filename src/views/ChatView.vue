<script setup>
import { API, graphqlOperation } from '@aws-amplify/api'
import { createMessage } from '@/graphql/mutations'
import { listMessages } from '@/graphql/queries'
import { onCreateMessage } from '@/graphql/subscriptions'
import { ref, onBeforeUnmount, onUpdated } from 'vue'

const messages = ref([])
const content = ref('')
const subscription = ref({})
const props = defineProps({
  username: String
})

const sendMessage = async () => {
  if (event.keyCode !== 13 || !content.value) return

  const message = {
    id: new Date().getTime() + props.username,
    content: content.value
  }

  // Mutation (createMessage) の実装 ↓
  API.graphql(graphqlOperation(createMessage, { input: message })).catch((error) =>
  console.warn(error)
)
  // ↑↑↑↑↑↑
  content.value = ''
}

const fetch = async () => {
  // Query (listMessages) の実装 ↓
  API.graphql(graphqlOperation(listMessages, { input: 100 }))
  .then(
    (value) =>
      (messages.value = value.data.listMessages.items.sort((a, b) => (a.id > b.id ? 1 : -1)))
  )
  .catch((error) => console.warn(error))
  // ↑↑↑↑↑↑
}

const subscribe = async () => {
  // Subscription (onCreateMessages) の実装 1 ↓
  subscription.value = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
  next: (eventData) => {
    const message = eventData.value.data.onCreateMessage;
    messages.value = [...messages.value, message];
  },
  error: (error) => console.warn(error),
  });
  // ↑↑↑↑↑↑
}

const scrollBottom = () => {
  const container = document.querySelector('.message_base')
  container.scrollTop = container.scrollHeight
}

onBeforeUnmount(() => {
  // Subscription (onCreateMessages) の実装 2 ↓
  subscription.value.unsubscribe();
  // ↑↑↑↑↑↑
})

onUpdated(() => {
  scrollBottom()
})

fetch()
subscribe()
</script>

<template>
  <div class="main-contents">
    <div class="message_base">
      <div v-for="message in messages" :key="message.id">
        <div v-bind:class="[message.owner === username ? 'message' : 'message_opponent']">
          {{ message.content }}
        </div>
        <div v-bind:class="[message.owner === username ? 'username' : 'username_opponent']">
          {{ message.owner }}
        </div>
      </div>
    </div>
    <input
      class="message-input"
      placeholder="Enter a message (send with Shift+Enter)"
      v-model="content"
      @keydown.enter.shift="sendMessage"
    />
  </div>
</template>

<style scoped>
.main-contents {
  float: left;
  width: 100%;
  height: calc(100vh - 112px);
}
.message_base {
  overflow: auto;
  height: calc(100% - var(--amplify-space-xxl));
  background-color: #7493bc;
}

.message-input {
  width: 100%;
  height: var(--amplify-space-xxl);
}

.message {
  width: 40%;
  margin: 10px 10px 10px auto;
  padding: 20px;
  background-color: #7ade40;
  border-radius: 30px;
}
.message_opponent {
  width: 40%;
  margin: 10px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 30px;
  word-wrap: break-word;
}
.username {
  text-align: right;
  margin: -12px 10px 0px 0px;
  font-size: 14px;
}
.username_opponent {
  text-align: left;
  margin: -12px 0px 0px 10px;
  font-size: 14px;
}
</style>
