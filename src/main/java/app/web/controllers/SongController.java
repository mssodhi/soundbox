package app.web.controllers;

import app.web.domain.Analytics;
import app.web.domain.Lyrics;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.helper.AwsHelper;
import app.web.services.AnalyticsService;
import app.web.services.LyricsService;
import app.web.services.SongService;
import app.web.services.UserService;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/song/")
public class SongController {

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @Autowired
    private AwsHelper awsHelper;

    @Autowired
    private AnalyticsService analyticsService;

    @Autowired
    private LyricsService lyricsService;

    @RequestMapping(value = "save/user/{id}", method = RequestMethod.POST)
    public Object saveSong(@RequestBody Song song, @PathVariable String id){
        User user = userService.getByFbId(id);
        user.setSongs_length(user.getSongs_length() + 1);
        user = userService.save(user);
        song.setUser(user);
        return songService.save(song);
    }

    @RequestMapping(value = "lyrics/save", method = RequestMethod.PUT)
    public Object saveLyrics(@RequestBody Lyrics lyrics){
        return lyricsService.save(lyrics);
    }

    @RequestMapping(value = "{id}/file/save", method = RequestMethod.POST)
    public Object saveFile(MultipartFile musicFile, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        String keyName = "songs/" + song.getIdentifier();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("audio/mpeg");
        String url = awsHelper.put(musicFile, keyName, objectMetadata);
        if(url.length() > 0){
            song.setSong_url(url);
            return songService.save(song);
        }
        return null;
    }

    @RequestMapping(value = "{id}/image/save", method = RequestMethod.POST)
    public void savePic(MultipartFile image, @PathVariable Integer id) throws Exception {
        Song song = songService.findById(id);
        String keyName = "images/" + song.getIdentifier();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/jpeg");
        String imageUrl = awsHelper.put(image, keyName, objectMetadata);
        if(imageUrl.length() > 0){
            song.setArtwork_url(imageUrl);
            songService.save(song);
        }
    }

    @RequestMapping(value = "{id}/update", method = RequestMethod.PUT)
    public void updatePlaysCount(@PathVariable Integer id, @RequestBody String fb_id){
        Song song = songService.findById(id);
        User user = userService.getByFbId(fb_id);
        if(!user.getFb_id().equals(song.getUser().getFb_id())){
            song.setPlays(song.getPlays() + 1);
            songService.save(song);
            Analytics analytics = analyticsService.getByUser(song.getUser());
            analytics.setPlays_today(analytics.getPlays_today() + 1);
            analyticsService.save(analytics);
        }
    }
}
