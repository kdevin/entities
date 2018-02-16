<template>
	<div class="container">
		<h1 class="text-center">Sports, News & Entities</h1>
		<p class="text-justify">Sports, News & Entities est un projet universitaire réalisé par Kévin Devin, sur un sujet proposé et tutoré par Marc Spaniol. En utilisant l'outil d'annotation sémantique de texte nommé DBpedia Spotlight, l'objectif est d'identifier et de mettre en exergue les entités dans les articles sportifs et d'enrichir la page avec leurs informations.</p>
		<p class="text-justify">Les entités sont identifiés selon un code couleur : <br/>
			<a class="red">Stadium</a>, <a class="orange">SoccerManager</a>, <a class="yellow">SoccerPlayer</a> et <a class="green">SoccerClub</a>.</p>
	</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.container { margin-top: 50px; }
h1{ margin-bottom: 50px; }
p{ font-size: 25px; }
</style>
