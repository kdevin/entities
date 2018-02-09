<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {Navbar},
  name: 'App',
  created () {
    this.setDisabledDateFrom()
  },
  methods: {
    setDisabledDateFrom () {
      this.$store.dispatch('setDisabledDateFrom')
    }
  }
}
</script>

<style>
body{
	margin-top: 84px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	padding-top: 20px;
}

.red{
	background-color: #ff4c4c;
}
.orange{
	background-color: #ffc04c;
}
.yellow{
	background-color: #ffff4c;
}
.green{
	background-color: #4ca64c;
}
.blue{
	background-color: #4c4cff;
}
</style>
