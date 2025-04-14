<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    title: 'NuxtShop Coffee',
    ogTitle: 'NuxtShop Coffee',
    description: 'Cà phê ngon số 1 Việt Name.',
    ogDescription: 'Cà phê ngon số 1 Việt Name.',
  })
}
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
