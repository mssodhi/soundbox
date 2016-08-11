package app.web.controllers;

import app.web.domain.Song;
import app.web.domain.SongContent;
import app.web.domain.User;
import app.web.services.SongContentService;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;

@RestController
@RequestMapping(value = "/api/song/")
public class SongController {

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @Autowired
    private SongContentService songContentService;

    @RequestMapping(value = "save/song/{id}", method = RequestMethod.POST)
    public Object save(MultipartFile file, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        SongContent songContent = new SongContent();
        songContent.setContent(new SerialBlob(file.getBytes()));
        songContent.setSong(song);
        songContentService.save(songContent);
        return song;
    }

    @RequestMapping(value = "image/song/{id}", method = RequestMethod.POST)
    public void savePic(MultipartFile file, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        song.setArtwork(new SerialBlob(file.getBytes()));
        songService.save(song);
    }


    @RequestMapping(value = "save/user/{id}", method = RequestMethod.PUT)
    public Object saveSong(@RequestBody Song song, @PathVariable String id){
        User user = userService.getByFbId(id);
        song.setUser(user);
        return songService.save(song);
    }

    @RequestMapping(value = "getSongContent/song/{id}", method = RequestMethod.GET)
    public Object getSong(@PathVariable Integer id) throws Exception {
        return songContentService.getSongContentBySong(id);
    }
}
