export default {
  install (Vue, options) {
    Vue.prototype.$getTypeOfEntities = function (el) {
      var array = el.getAttribute('title').split('/')
      var entity = array[array.length - 1]
      return new Promise((resolve, reject) => {
        this.$http.get('http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?&QueryString=' + entity)
          .then(response => {
            if (response.body.results.length !== 0) {
              var result = response.body.results.find(function (result) { return result.uri === 'http://dbpedia.org/resource/' + entity })
              var classes = null
              if (typeof result !== 'undefined') {
                classes = result.classes
              } else {
                classes = response.body.results[0].classes
              }
  
              if (classes.length !== 0) {
                if (classes.some(function (type) { return type.uri === 'http://dbpedia.org/ontology/SoccerManager' })) {
                  el.setAttribute('class', 'orange')
                } else if (classes.some(function (type) { return type.uri === 'http://dbpedia.org/ontology/SoccerPlayer' })) {
                  el.setAttribute('class', 'yellow')
                } else if (classes.some(function (type) { return type.uri === 'http://dbpedia.org/ontology/SoccerClub' })) {
                  el.setAttribute('class', 'green')
                } else if (classes.some(function (type) { return type.uri === 'http://dbpedia.org/ontology/Stadium' })) {
                  el.setAttribute('class', 'blue')
                }
              }
            }
            resolve(null)
          }, (response) => {
            reject(response)
          })
      })
    }
    Vue.prototype.$getThumbnail = function (el) {
      var array = el.getAttribute('title').split('/')
      var entity = array[array.length - 1]
  
      return new Promise((resolve, reject) => {
        this.$http.get('http://dbpedia.org/data/' + entity + '.json')
          .then(response => {
            var thumbnail = null
            if (typeof response.body['http://dbpedia.org/resource/' + entity]['http://dbpedia.org/ontology/thumbnail'] !== 'undefined') {
              thumbnail = response.body['http://dbpedia.org/resource/' + entity]['http://dbpedia.org/ontology/thumbnail'][0].value
            }
            resolve(thumbnail)
          }, (response) => {
            reject(response)
          })
      })
    }
  }
}
