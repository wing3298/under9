<template>
    <!-- main wrapping component -->
    <q-layout>
        <!-- optional -->
        <q-layout-header>
            <!-- content; any -->
            <WaveView></WaveView>
        </q-layout-header>

        <!-- optional -->
        <q-layout-drawer side="left">
            <!-- content; any -->
            <q-scroll-area class="fit">
              <q-item to="/test-layout/toolbar">Toolbar</q-item>
              <q-item to="/test-layout/tabs">Tabs</q-item>
              <q-item to="/test-layout/drawer">Drawer</q-item>
            </q-scroll-area>
            <WaveListView></WaveListView>
        </q-layout-drawer>

        <!-- optional -->
        <q-layout-drawer side="right">
            <!-- content; any -->
        </q-layout-drawer>

        <!-- REQUIRED -->
        <q-page-container>
            <!--
            Here it's where Vue Router injects children
            Page components.

            <router-view/> tag below can be replaced by an
            actual page content should you wish to do so.
            -->
            <router-view />
            <!--
            First child of QPageContainer must be a QPage,
            so make sure that your layout route children components
            encapsulate a QPage.
            -->
        </q-page-container>

        <!-- optional -->
        <q-layout-footer>
            <!-- content; any -->
        </q-layout-footer>
    </q-layout>
</template>

<script lang="ts">
import WaveListView from './components/parts/WaveListView.vue';
import WaveView from './components/parts/WaveView.vue';

export default {
  name: 'App',
  data() {
    return {
      logoimg: './assets/logo.png',
    };
  },
  components: {
    waveListView: WaveListView,
    waveView: WaveView,
  },

};
</script>

<style lang="scss">
  .red {
    color: red;
  }
</style>