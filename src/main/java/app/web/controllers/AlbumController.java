package app.web.controllers;

import app.web.domain.Album;
import app.web.domain.AlbumSong;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.AlbumService;
import app.web.services.AlbumSongService;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/album/")
public class AlbumController {

    @Autowired
    private UserService userService;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private SongService songService;

    @Autowired
    private AlbumSongService albumSongService;

    @RequestMapping(value = "create/{name}/user/{id}", method = RequestMethod.GET)
    public Object getAnalytics(@PathVariable String name, @PathVariable String id) throws Exception{
        User user = userService.getByFbId(id);
        Album album = new Album();
        album.setName(name);
        album.setOwner(user);
        return albumService.save(album);
    }

    @RequestMapping(value = "{id}/addSong/{songId}", method = RequestMethod.GET)
    public Object addSongToAlbum(@PathVariable Integer id, @PathVariable Integer songId){
        Album album = albumService.findById(id);
        Song song = songService.findById(songId);
        AlbumSong albumSong = new AlbumSong();
        albumSong.setSong(song);
        albumSong.setAlbum(album);
        albumSong = albumSongService.save(albumSong);
        Set<AlbumSong> albumSongSet = album.getAlbumSongSet();
        albumSongSet.add(albumSong);
        album.setAlbumSongSet(albumSongSet);
        return albumService.save(album);
    }
}
