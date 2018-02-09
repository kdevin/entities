<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-success fixed-top">
		<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<h1 class="navbar-brand mb-0 active">
			<router-link to="/" class="text-light nav-link">
				Sports, News & Entities
			</router-link>
		</h1>

		<div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto"></ul>
			<ul class="navbar-nav">
				<li class="nav-item m-3">
					<datepicker v-model="dateSelected" :disabled="disabled" :format="customFormatter"/>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'navbar',
  components: { Datepicker },
  computed: {
    dateSelected: {
      get () {
        return this.$store.getters.dateSelected
      },
      set (value) {
        this.$store.dispatch('setDateSelected', value)
      }
    },
    disabled () {
      return this.$store.getters.disabled
    }
  },
  mounted () {
    this.setDateSelected()
  },
  methods: {
    customFormatter (date) {
      return moment(date).format('DD/MM/YY')
    },
    setDateSelected () {
      this.$store.dispatch('setDateSelected', this.dateSelected)
    }
  }
}
</script>

<style scoped>
.navbar-brand{
	margin-left: 60px;
}
.navbar-nav{
	margin-right: 60px;
}
</style>
