<template>
  <div id="animation" style="height: 100vh; background-color: #47494e;">
    <b-container class="pt-5">
      <h1 class="text-white">test</h1>


      <b-button @click="isActive = !isActive">push</b-button>
      <div class="animeBox" :class="{'active': isActive}" :style="styles">
        <div :key="i" v-for="(item,i) in 3" :class="['anm_square_'+i, {'active': isActive}]" />
      </div>
    </b-container>
  </div>
</template>

<script>

    import linq from 'linq'

    export default {
        data () {
            return {
                isActive: false
            }
        },

        computed:{
            styles() {
                return {

                }
            }
        },

        methods: {

        }
    }
</script>

<style lang="scss" scoped>
  #animation {
    .animeBox {
      position: relative;

      --width: 200px;
      --height: 200px;

      .anm_square_0 {
        width: var(--width);
        height: var(--height);
        opacity: 0;
        border: 15px solid #ffffff80;
        &.active {
          animation: fadeIn 400ms 0s forwards,
          role45 400ms 350ms forwards,
          borderNone 1000ms 800ms forwards;
        }
      }
      .anm_square_1 {
        width: var(--width);
        height: var(--height);
        opacity: 0;
        border: 15px solid #ffffff80;
        position: absolute;
        top: 0;
        left: 120px;
        &.active {
          animation: fadeIn 400ms 500ms forwards,
          role45 400ms 850ms forwards,
          borderNone 1000ms 1300ms forwards;
        }
      }
      .anm_square_2 {
        width: var(--width);
        height: var(--height);
        opacity: 0;
        border: 15px solid #ffffff80;
        position: absolute;
        top: 0;
        left: 240px;
        &.active {
          animation: fadeIn 400ms 1000ms forwards,
          role45 400ms 1350ms forwards,
          borderNone 1000ms 1800ms forwards;
        }
      }
    }
  }
</style>
