<template>
    <!-- main wrapping component -->
    <q-layout>
        <!-- optional -->
        <q-layout-header reveal="false">
            <!-- content; any -->
            <q-toolbar color="primary">
              <!--
                For Toolbar title, we use
                QToolbarTitle component
              -->
              <q-btn
                flat round dense
                icon="menu"
                @click="leftSide = !leftSide"
              />

              <q-toolbar-title>
                na-meeting
              </q-toolbar-title>

              <!--
                In a Toolbar, buttons are best
                configured as "flat, round, dense" and with an icon,
                but any button will do
              -->
              <q-btn flat round dense icon="settings" />
            </q-toolbar>
        </q-layout-header>

        <!-- optional -->
        <q-layout-drawer side="left" content-class="bg-grey-3" v-model="leftSide" :content-style="{width: '200px'}">
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
            <WaveMenu></WaveMenu>
            <!--
            Here it's where Vue Router injects children
            Page components.

            <router-view/> tag below can be replaced by an
            actual page content should you wish to do so.
            -->
            <WaveView></WaveView>
            <!--
            First child of QPageContainer must be a QPage,
            so make sure that your layout route children components
            encapsulate a QPage.
            -->

            <div class="">
              <WaveReplyFormView></WaveReplyFormView>
            </div>
        </q-page-container>

        <!-- optional -->
        <q-layout-footer reveal="false">
            <!-- content; any -->
            <WaveMenu></WaveMenu>
        </q-layout-footer>
    </q-layout>
</template>

<script lang="ts">
import WaveListView from './components/parts/WaveListView.vue';
import WaveMenu from './components/parts/WaveMenu.vue';
import WaveView from './components/parts/WaveView.vue';
import WaveFooter from './components/parts/WaveFooter.vue';
import WaveReplyFormView from './components/parts/WaveReplyFormView.vue';

export default {
  name: 'App',
  data() {
    return {
      logoimg: './assets/logo.png',
      leftSide: true,
      header: true,
    };
  },
  components: {
    waveListView: WaveListView,
    waveMenu: WaveMenu,
    waveView: WaveView,
    waveFooter: WaveFooter,
    waveReplyFormView: WaveReplyFormView,
  },

};
</script>

<style lang="scss">
.contentFooter {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 106px;
}
</style>