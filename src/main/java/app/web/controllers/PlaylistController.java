package app.web.controllers;

import app.web.domain.Playlist;
import app.web.domain.PlaylistSong;
import app.web.domain.User;
import app.web.services.PlaylistService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/playlist/")
public class PlaylistController {

    @Autowired
    public UserService userService;

    @Autowired
    public PlaylistService playlistService;

    @RequestMapping(value = "getPlaylist", method = RequestMethod.GET)
    public Object getPlaylistCurrentUser () {
        User currentUser = userService.getCurrentUser();
        return playlistService.findByUser(currentUser.getId());
    }

    @RequestMapping(value = "getPlaylistById/{id}", method = RequestMethod.GET)
    public Object getPlaylistById (@PathVariable Integer id) {
        return playlistService.findById(id);
    }

    @RequestMapping(value = "addPlaylist/{name}", method = RequestMethod.GET)
    public Object addPlaylist(@PathVariable String name) {
        User currentUser = userService.getCurrentUser();
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

    @RequestMapping(value = "addSong/{songId}", method = RequestMethod.POST)
    public Object addSongToPlaylist(@PathVariable String songId, @RequestBody Playlist playlist) {

        PlaylistSong song = new PlaylistSong();
        song.setTrack_id(songId);
        song.setPlaylist(playlist);
        playlistService.savePlayListSong(song);

        Set<PlaylistSong> songSet = playlist.getSongs();
        songSet.add(song);
        playlist.setSongs(songSet);
        return playlistService.save(playlist);
    }
}
