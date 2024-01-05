<script setup lang="ts">
const props = defineProps<{
  uid: number
  tid: number
  rid: number
  upvotes: number[]
  toUid: number
}>()

const isUpvote = ref(props.upvotes.includes(props.uid))
const upvoteCount = ref(props.upvotes.length)

watch(
  () => props.upvotes,
  (newUpvote) => {
    isUpvote.value = props.upvotes.includes(props.uid)
    upvoteCount.value = newUpvote.length
  }
)

const upvoteTopic = async () => {
  const res = await useTempMessageStore().alert(
    'AlertInfo.edit.upvoteTopic',
    true
  )
  if (!res) {
    return
  }

  const queryData = {
    to_uid: props.toUid,
    time: Date.now(),
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/upvote`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    upvoteCount.value++
    isUpvote.value = true
    useMessage('Topic upvote successfully', '推话题成功', 'success')
  }
}

const upvoteReply = async () => {
  const res = await useTempMessageStore().alert(
    'AlertInfo.edit.upvoteReply',
    true
  )
  if (!res) {
    return
  }

  const queryData = {
    to_uid: props.toUid,
    rid: props.rid,
    time: Date.now(),
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/reply/upvote`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    upvoteCount.value++
    isUpvote.value = true
    useMessage('Reply upvote successfully', '推回复成功', 'success')
  }
}

const handleClickUpvote = async () => {
  if (props.uid === props.toUid) {
    useMessage(
      'You cannot upvote your own topic',
      '您不可以推自己的话题',
      'warn'
    )
    return
  }

  if (useKUNGalgameUserStore().moemoepoint < 1100) {
    useMessage(
      `Your moemoepoints are less than 1100, so you can't use the upvote topic feature`,
      '您的萌萌点不足 1100, 无法使用推话题功能',
      'warn'
    )
    return
  }

  if (props.rid === 0) {
    upvoteTopic()
  } else {
    upvoteReply()
  }
}
</script>

<template>
  <li>
    <span
      class="upvote"
      :class="isUpvote ? 'active' : ''"
      @click="handleClickUpvote"
    >
      <Icon class="icon" name="bi:rocket" />
    </span>
    {{ upvoteCount }}
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 17px;
  margin-right: 0;

  span {
    display: flex;
    margin-right: 3px;
  }
}

.upvote {
  font-size: 24px;
  color: var(--kungalgame-red-4);
  cursor: pointer;
}

.active .icon {
  color: var(--kungalgame-blue-4);
}
</style>