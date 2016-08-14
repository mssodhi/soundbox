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

    @RequestMapping(value = "{id}/content/save", method = RequestMethod.POST)
    public Object saveFile(MultipartFile musicFile, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        SongContent songContent = new SongContent();
        songContent.setContent(new SerialBlob(musicFile.getBytes()));
        songContent.setSong(song);
        songContentService.save(songContent);
        return song;
    }

    @RequestMapping(value = "{id}/image/save", method = RequestMethod.POST)
    public void savePic(MultipartFile image, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        song.setArtwork(new SerialBlob(image.getBytes()));
        songService.save(song);
    }


    @RequestMapping(value = "save/user/{id}", method = RequestMethod.POST)
    public Object saveSong(@RequestBody Song song, @PathVariable String id){
        User user = userService.getByFbId(id);
        user.setSongs_length(user.getSongs_length() + 1);
        user = userService.save(user);
        song.setUser(user);
        return songService.save(song);
    }

    @RequestMapping(value = "{id}/getSongContent", method = RequestMethod.GET)
    public Object getSong(@PathVariable Integer id) throws Exception {
        return songContentService.getSongContentBySong(id);
    }
}
