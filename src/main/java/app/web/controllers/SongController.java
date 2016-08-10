package app.web.controllers;

import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;

@RestController
@RequestMapping(value = "/api/song/")
public class SongController {

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @RequestMapping(value = "save/user/{id}", method = RequestMethod.POST)
    public Object getSettings(MultipartFile file, @PathVariable String id) throws Exception{
        User user = userService.getByFbId(id);

        Song song = new Song();
        song.setBlob(new SerialBlob(file.getBytes()));
        song.setName(file.getOriginalFilename());
        song.setUser(user);
        return songService.save(song);
    }

}
