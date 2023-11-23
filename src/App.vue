<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-toolbar color="#242c3c" theme="dark" >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Amplify Vue Workshop</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn  icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-tabs align-tabs="title">
        <v-tab to="/">HOME</v-tab>
        <v-tab to="/chat">CHAT</v-tab>
        <v-tab to="/ai">AI/ML</v-tab>
        <v-tab to="/geo">GEO</v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
  <RouterView />
</template>
