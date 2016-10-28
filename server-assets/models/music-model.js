let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;
    formatQuery = dataAdapter.formatQuery;


let Playlist = DS.defineResource({
    name: 'playlist',
    endpoint: 'playlists',

})

function create(playlist, cb){
    let playlistObj = { 
        id: uuid.v4(), 
        name: playlist.name,
        songs: playlist.songs,
        upVotes: playlist.upVotes,
        downVotes: playlist.downVotes
        };
    Playlist.create(playlistObj).then(cb).catch(cb)
}

function getAll(query, cb){
    Playlist.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb){
    Playlist.find(id, formatQuery(query)).then(cb).catch(cb)
}

function editPlaylist(id, input, cb) {
    Playlist.find(id).then(function(playlist){
       playlist.name=input.name
       playlist.downVotes=input.downVotes,
       playlist.upVotes=input.upVotes,
       playlist.songs=input.songs;
       Playlist.update(playlist.id, playlist).then(function(){
           DS.update('playlist', playlist.id, playlist)
       .then(cb)
       .catch(cb)
   }).catch(cb)
   }).catch(cb)
}



function removeSong(id, songId, cb) {
    Playlist.find(id).then(function (playlist) {
        playlist.songs[songId] = null
        Playlist.update(playlist.id, playlist)
            .then(cb)
            .catch(cb)
    }).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById
}