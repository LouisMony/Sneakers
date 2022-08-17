<template>
  <div id="app">
    <div class="navbar">
      <NavBar/>
    </div>
    <div class="router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

.button{
  background: linear-gradient(91.63deg, #FF8843 0%, #F05E2F 100%);
  border: 1px solid rgba(255, 255, 255, 0.33);
  border-radius: 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  padding: 10px;
  width: 90%;
  cursor: pointer;
  transition: all 200ms linear;

  &__off{
    transition: all 200ms linear;
    cursor: pointer;
    background: #1E1E1E;
    border: 1px solid rgba(255, 255, 255, 0.33);
    color: #C7C7C7;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    padding: 10px;
    border-radius: 20px;
    width: 90%;
    &:hover{
      filter: brightness(80%);
    }
  }
  &:hover{
    filter: brightness(80%);
  }
}

body{
  font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  #app {
    background: #1E1E1E;
    color: #C7C7C7;
    display: flex;

    .navbar{
      height: 100vh;
      width: 11vw;
      min-width: 180px;
      background: #131313;
      border-right: 2px solid #F05E2F;
    }

    .router-view{
      height: 100vh;
      width: 84vw;
      margin: auto;
      overflow-y: scroll;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

</style>
