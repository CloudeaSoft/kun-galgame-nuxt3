<script setup lang="ts">
const font = ref('')
const { showKUNGalgameFontStyle } = storeToRefs(usePersistSettingsStore())

const setFont = () => {
  if (font.value) {
    usePersistSettingsStore().setKUNGalgameFontStyle(font.value)
    font.value = ''
  } else {
    usePersistSettingsStore().setKUNGalgameFontStyle('system-ui')
  }
}
</script>

<template>
  <div class="font">
    <div class="title">
      <span>{{ $t('header.settings.font') }}</span>
      <span v-if="showKUNGalgameFontStyle === 'system-ui'">
        {{ $t('header.settings.default') }}
      </span>
      <span v-else-if="showKUNGalgameFontStyle !== 'system-ui'">
        {{ showKUNGalgameFontStyle }}
      </span>
    </div>

    <div class="font-input">
      <input
        :placeholder="`${$t('header.settings.fontInput')}`"
        type="text"
        v-model="font"
        required
      />
      <button @click="setFont">
        {{ $t('header.settings.confirm') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.font-input {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  padding-bottom: 10px;

  input {
    width: 100%;
    padding-left: 7px;
    height: 30px;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    color: var(--kungalgame-font-color-3);

    &:focus {
      outline: none;
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  button {
    flex-shrink: 0;
    padding: 0 10px;
    height: 30px;
    width: 70px;
    color: var(--kungalgame-font-color-3);
    border: 1px solid var(--kungalgame-blue-5);
    border-left: none;
    background-color: var(--kungalgame-trans-white-9);
    cursor: pointer;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }
  }
}
</style>
