package app.web.helper;

import app.web.domain.Playlist;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.PlaylistService;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class SearchHelper {

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @Autowired
    private PlaylistService playlistService;

    public Set<User> searchUsers(String query){
        return userService.seachByName(query);
    }

    public Set<Song> searchSongs(String query){
        return songService.searchByName(query);
    }

    public Set<Playlist> searchPlaylists(String query){
        return playlistService.searchByName(query);
    }
}
