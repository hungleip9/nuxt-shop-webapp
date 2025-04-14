<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    title: 'NuxtShop Coffee',
    ogTitle: 'NuxtShop Coffee',
    description: 'Cà phê ngon số 1 Việt Nam.',
    ogDescription: 'Cà phê ngon số 1 Việt Nam.',
  })
}
</script>
<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
