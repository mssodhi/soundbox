package app.web.controllers;

import app.web.domain.Playlist;
import app.web.domain.User;
import app.web.services.PlaylistService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

        User user = userService.getCurrentUser();

        Set<Playlist> playlists = playlistService.findByUser(user.getId());

        return playlists;

    }
}
