<script setup lang="ts">
const { showAlert, alertTitle, alertMsg, isShowCancel } = storeToRefs(
  useTempMessageStore()
)

const { locale } = useI18n()

const handleClose = () => {
  showAlert.value = false
  useTempMessageStore().handleClose()
}

const handleConfirm = () => {
  showAlert.value = false
  useTempMessageStore().handleConfirm()
}
</script>

<template>
  <Teleport to="body" :disabled="showAlert">
    <Transition name="alert">
      <div v-if="showAlert" class="mask">
        <div class="container">
          <div class="header">
            <h3 v-if="alertTitle">{{ alertTitle[locale as Language] }}</h3>
            <p v-if="alertMsg">{{ alertMsg[locale as Language] }}</p>
          </div>

          <div class="footer">
            <button
              v-if="isShowCancel ?? true"
              class="button"
              @click="handleClose"
            >
              {{ $t('ComponentAlert.cancel') }}
            </button>
            <button class="button" @click="handleConfirm">
              {{ $t('ComponentAlert.confirm') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  display: flex;
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
}

.container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  .header {
    h3 {
      margin-bottom: 7px;
    }

    p {
      font-size: small;
    }
  }
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.button {
  width: 70px;
  height: 30px;
  cursor: pointer;
  border-radius: 2px;

  &:nth-child(1) {
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-blue-5);
    color: var(--kungalgame-blue-5);
  }

  &:nth-child(2) {
    margin-left: 98px;
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-red-5);
    color: var(--kungalgame-red-5);
  }

  &:active {
    transform: scale(0.9);
    transition: 0.1s;
  }
}

.alert-enter-from {
  opacity: 0;
}

.alert-leave-to {
  opacity: 0;
}

.alert-enter-from .container,
.alert-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
