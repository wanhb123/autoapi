<template>
  <div id="app">
<!--    <login></login>-->
    <router-view/>
  </div>
</template>
<script>
    import Login from './components/user/Login'

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            Login
        }
    }
</script>
<style>
</style>
