<template>
  <a class="waveitem" href="#wave/">
      <div class="wave-list-title">
        <span class="circular label bg-primary text-white float-right">
          <ul id="">
            <li v-for="(item, index) in waveList" :key="index">
              {{ item.name }}
            </li>
          </ul>
        </span>
      </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { getWaveListAll } from "../../controller/waveLoader";

export default defineComponent({
  name: 'WaveListView',
  template: '#WaveListView',
  setup() {
    let waveList: Array<Object> = reactive([]);

    getWaveListAll((result): void =>{
      //callback
      for(let doc of result){
        waveList.push(doc);
      }
      console.log(result);
    });

    return {
      waveList
    };
  }
});
</script>
