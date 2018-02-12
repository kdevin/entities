<template>
  <div class="my-container">
    <div class="row">

      <div class="col-3" id="left">
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

      <div class="invisible col-3"><!--hidden spacer--></div>

      <div class="col-6 article">
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

      <div class="col-3 article">
        <div v-for="(thumb, i) in thumbnails" v-bind:key="'thumb'+i">
          <div class="col-12 thumbnail" v-if="thumb !== null">
            <img class="img-fluid rounded" v-bind:title="thumb.entity" :src="thumb.image" alt="Thumbnail">
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
    },
    thumbnails () {
      return this.$store.getters.thumbnails
    }
  },
  methods: {
    setSelectedNews (index) {
      var diff = this.currentNews[index]

      var parser = new DOMParser()
      var doc = parser.parseFromString(diff.dbpedia, 'text/html')

      var promises = []

      Array.from(doc.getElementsByTagName('a')).forEach((el) => {
        promises.push(this.$getTypeOfEntities(el))
        promises.push(this.$getThumbnail(el))
      })

      Promise.all(promises).then(thumbnails => {
        diff.dbpedia = doc.body.innerHTML
        this.$store.dispatch('setNewsSelected', diff)
        this.$store.dispatch('setThumbnails', this.removeDuplicates(thumbnails.filter(function (n) { return n !== undefined && n !== null }), 'entity'))
      }).catch(function (err) {
        console.log(err)
      })
    },
    removeDuplicates (originalArray, prop) {
      var newArray = []
      var lookupObject = {}

      for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i]
      }

      for (i in lookupObject) {
        newArray.push(lookupObject[i])
      }
      return newArray
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-container{
    margin: 0 50px 0;
  }
  #left {
    position: fixed;
    top: 84px;
    bottom: 0;
    padding-top: 20px;
  }
  .list-articles{
    height:calc(100vh - 124px);
    overflow: auto;
  }

  .article{
    padding-left: 40px;
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
  br {
    margin: 10px 0;
  }
  .thumbnail{
    margin-bottom: 20px;
  }
</style>
