package app.web.controllers;


import app.web.domain.Likes;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.LikesService;
import app.web.services.SongService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/likes/")
public class LikesController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikesService likesService;

    @Autowired
    private SongService songService;

    @RequestMapping(value = "get/user/{id}", method = RequestMethod.GET)
    public Object get (@PathVariable String id) {
        User user = userService.getByFbId(id);
        if(user != null){
            return likesService.findByUser(user.getId());
        }else{
            return null;
        }
    }

    @RequestMapping(value = "song/{songId}/user/{userId}", method = RequestMethod.GET)
    public Object toggleLike (@PathVariable Integer songId, @PathVariable String userId) {

        User user = userService.getByFbId(userId);
        Song song = songService.findById(songId);
        Likes like = likesService.findBySongAndUser(song, user);

        if(like != null){
            likesService.removeLike(like);
            song.setLikes(song.getLikes() - 1);
            songService.save(song);
            return null;
        }else{
            Likes likes = new Likes();
            likes.setSong(song);
            likes.setUser(user);
            song.setLikes(song.getLikes() + 1);
            songService.save(song);
            likes.setUser(user);
            return likesService.save(likes);
        }

    }

}
