let uuid = require('uuid')
    JsData = require('js-data'),
    FBAdapter = require('js-data-firebase'),
    DS = new JsData.DS()

let fbAdapter = new FBAdapter({
    basePath: 'https://my-musical-life.firebaseio.com/'
})

function formatQuery(query){
    query = query || ''
    return {
        with: query.split(',').join(' ').split(' ')
    }
}

DS.registerAdapter('firebase', fbAdapter, {default:true})

module.exports = {
    DS,
    uuid,
    formatQuery
}