export default {
  install (Vue, options) {
    Vue.prototype.$getTypeOfEntities = function (el) {
      var array = el.getAttribute('title').split('/')
      var entity = array[array.length - 1]
    
      var resource = '<http://dbpedia.org/resource/' + entity + '>'
      var query = 'SELECT ?classes WHERE { ' + resource + ' rdf:type ?classes }'
    
      return new Promise((resolve, reject) => {
        this.$http.get('http://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=' + encodeURIComponent(query) + '&output=json')
          .then(response => {
            var classes = response.body.results.bindings
            
            classes.forEach((object) => {
              if (object.classes.value === 'http://dbpedia.org/ontology/SoccerManager') {
                el.setAttribute('class', 'orange')
              } else if (object.classes.value === 'http://dbpedia.org/ontology/SoccerPlayer') {
                el.setAttribute('class', 'yellow')
              } else if (object.classes.value === 'http://dbpedia.org/ontology/SoccerClub') {
                el.setAttribute('class', 'green')
              } else if (object.classes.value === 'http://dbpedia.org/ontology/Stadium') {
                el.setAttribute('class', 'red')
              }
            })
            resolve()
          }, (response) => {
            reject(response)
          })
      })
    }
    Vue.prototype.$getThumbnail = function (el) {
      var array = el.getAttribute('title').split('/')
      var entity = array[array.length - 1]
      
      var resource = '<http://dbpedia.org/resource/' + entity + '>'
      var query = 'PREFIX dbpedia-owl: <http://dbpedia.org/ontology/> SELECT ?thumbnail WHERE {' + resource + ' dbpedia-owl:thumbnail ?thumbnail}'
      
      return new Promise((resolve, reject) => {
        this.$http.get('http://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=' + encodeURIComponent(query) + '&output=json')
          .then(response => {
            if (response.body.results.bindings.length === 0) {
              resolve(null)
            } else {
              resolve({'entity': entity, 'image': response.body.results.bindings[0].thumbnail.value})
            }
          }, (response) => {
            reject(response)
          })
      })
    }
  }
}
