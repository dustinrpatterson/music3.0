const router = require('express').Router();
const Music = require('../models/music-model');

//WHAT DO I PUT IN HERE?
module.exports.mountPath = '/playlists'
module.exports.router = router;

router.route('/:id?')
    .get(function (req, res, next){
        if (req.params.id){
            //not sure about the code below
            Music.getById(req.params.id, req.query.include, function(playlist){
                if(playlist.stack){ return next(playlist) }
                return res.send(playlist)
            })
        }else{
            Music.getAll(req.query.include, function(playlists){
                if(playlists.stack){return  next (playlists)}
                return res.send(playlists)
            });
        }
    })
    .post(function(req, res, next){
        Music.create(req.body, function(playlist){
            if(playlist.stack){ return next(playlist)}
            return res.send(playlist)
        })
    })
    .put(function (req, res, next) {
        Playlist.editPlaylist(req.params.id, req.body, function (playlist) {
            if (playlist.stack) { return next(playlist) }
            return res.send(playlist)
        })
    })
    .delete(function (req, res, next) {
        Playlist.removeSong(req.params.id, req.body.songId, function(playlist){
            if (playlist.stack){
                return next(playlist)
            }
            return res.send(playlist)
        })
    })