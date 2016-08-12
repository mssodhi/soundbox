package app.web.controllers;

import app.web.domain.Playlist;
import app.web.domain.PlaylistSong;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.PlaylistService;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/playlist/")
public class PlaylistController {

    @Autowired
    private UserService userService;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private SongService songService;

    @RequestMapping(value = "getPlaylist/user/{id}", method = RequestMethod.GET)
    public Object getPlaylist (@PathVariable String id) {
        User currentUser = userService.getByFbId(id);
        if(currentUser != null){
            return playlistService.findByUser(currentUser.getId());
        }else{
            return null;
        }
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT)
    public Object update(@RequestBody Playlist playlist){
        return playlistService.save(playlist);
    }

    @RequestMapping(value = "getPlaylistById/{id}", method = RequestMethod.GET)
    public Object getPlaylistById (@PathVariable Integer id) {
        return playlistService.findById(id);
    }

    @RequestMapping(value = "addPlaylist/{name}/user/{id}", method = RequestMethod.GET)
    public Object addPlaylist(@PathVariable String name, @PathVariable String id) {
        User currentUser = userService.getByFbId(id);
        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setOwner(currentUser);
        playlist.setIs_private(false);
        return playlistService.save(playlist);
    }

    @RequestMapping(value = "removePlaylist", method = RequestMethod.POST)
    public Object removePlaylist(@RequestBody Playlist playlist) {
        return playlistService.deletePlaylist(playlist);
    }

    @RequestMapping(value = "remove/song/{id}/playlist", method = RequestMethod.POST)
    public void removeSong(@PathVariable Integer id, @RequestBody Playlist playlist) {
        playlistService.removeSong(id, playlist);
    }

    @RequestMapping(value = "addSong/{songId}", method = RequestMethod.POST)
    public Object addSongToPlaylist(@PathVariable Integer songId, @RequestBody Playlist playlist) {

        PlaylistSong playlistSong = new PlaylistSong();
        Song song = songService.findById(songId);
        playlistSong.setSong(song);
        playlistSong.setPlaylist(playlist);
        playlistService.savePlayListSong(playlistSong);

        Set<PlaylistSong> songSet = playlist.getPlaylistSongs();
        songSet.add(playlistSong);
        playlist.setPlaylistSongs(songSet);
        return playlistService.save(playlist);
    }
}
