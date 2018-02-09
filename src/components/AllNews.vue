<template>
  <div class="my-container">
    <div class="row">

      <div class="col-4 right-navbar">
        <div class="list-group list-articles">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active"
             v-for="(news, i) in currentNews" v-bind:key="i"
             v-on:click.stop="setSelectedNews(i)">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">www.skysports.com</h5>
              <small>{{news.date}}</small>
            </div>
            <p class="mb-1">{{news.title}}</p>
          </a>
        </div>
      </div>

      <div class="col-8 article">
        <div v-if="Object.keys(newsSelected).length > 0" class="col-12">
          <div class="title">
            <h1>{{newsSelected.title}}</h1>
          </div>
          <div class="description">
            <p>{{newsSelected.description}}</p>
          </div>
          <div class="paragraph">
            <p class="text-justify" v-for="(paragraph, i) in newsSelected.dbpedia.split('<br>')" v-bind:key="'par'+i" v-html="paragraph"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllNews',
  computed: {
    currentNews () {
      return this.$store.getters.currentNews
    },
    newsSelected () {
      return this.$store.getters.newsSelected
    }
  },
  methods: {
    setSelectedNews (index) {
      this.$store.dispatch('setNewsSelected', this.currentNews[index])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  br {
    margin: 10px 0;
  }
  .my-container{
    margin: 20px 50px 20px;
  }
  .list-articles{
    height:calc(100vh - 124px);
    overflow: auto;
  }
  .title{
    margin: 0 0 30px;
  }
  .description > p{
    font-weight: bold;
    font-size: 19px;
  }
  .paragraph > p{
    font-size: 19px;
  }
</style>
