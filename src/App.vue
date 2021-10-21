<template>
    <!-- main wrapping component -->
    <q-layout>
        <!-- optional -->
        <q-header reveal>
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
                uneri
              </q-toolbar-title>

              <!--
                In a Toolbar, buttons are best
                configured as "flat, round, dense" and with an icon,
                but any button will do
              -->
              <q-btn flat round dense icon="settings" />
            </q-toolbar>
        </q-header>

        <!-- optional -->
        <q-drawer side="left" content-class="bg-grey-3" v-model="leftSide" :content-style="{width: '200px'}">
            <wave-list-view></wave-list-view>
        </q-drawer>

        <!-- optional -->
        <q-drawer side="right">
            <!-- content; any -->
        </q-drawer>

        <!-- REQUIRED -->
        <q-page-container>
            <wave-menu></wave-menu>
            <!--
            Here it's where Vue Router injects children
            Page components.

            <router-view/> tag below can be replaced by an
            actual page content should you wish to do so.
            -->
            <wave-view></wave-view>
            <!--
            First child of QPageContainer must be a QPage,
            so make sure that your layout route children components
            encapsulate a QPage.
            -->

            <div class="">
              <wave-reply-form-view></wave-reply-form-view>
            </div>
        </q-page-container>

        <!-- optional -->
        <q-footer reveal>
            <!-- content; any -->
            <wave-footer></wave-footer>
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WaveListView from './components/parts/WaveListView.vue';
import WaveMenu from './components/parts/WaveMenu.vue';
import WaveView from './components/parts/WaveView.vue';
import WaveFooter from './components/parts/WaveFooter.vue';
import WaveReplyFormView from './components/parts/WaveReplyFormView.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      logoimg: '../../../static/logo.png',
      leftSide: true,
      header: true,
      reveal: false,
    };
  },
  components: {
    WaveListView: WaveListView,
    WaveMenu: WaveMenu,
    WaveView: WaveView,
    WaveFooter: WaveFooter,
    WaveReplyFormView: WaveReplyFormView,
  },
  setup() {
    return{};
  }
});
</script>

<style lang="scss">
.contentFooter {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 106px;
}
</style>
