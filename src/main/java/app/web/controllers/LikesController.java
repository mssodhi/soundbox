package app.web.controllers;


import app.web.domain.Likes;
import app.web.domain.User;
import app.web.services.LikesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/likes/")
public class LikesController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikesService likesService;

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public Object get () {
        User user = userService.getCurrentUser();
        if(user != null){
            return likesService.findByUser(user.getId());
        }else{
            return null;
        }
    }

    @RequestMapping(value = "add/{id}", method = RequestMethod.POST)
    public Object add (@PathVariable String id, @RequestBody String genre) {

        User user = userService.getCurrentUser();
        if(likesService.findBySongAndUser(id, user) == null){
            Likes likes = new Likes();
            likes.setSong_genre(genre);
            likes.setSong_id(id);
            likes.setUser(user);
            return likesService.save(likes);
        }else{
            return null;
        }

    }

    @RequestMapping(value = "remove/{id}", method = RequestMethod.DELETE)
    public Object remove (@PathVariable String id) {
        User user = userService.getCurrentUser();
        likesService.removeByIdAndUser(id, user);
        return null;
    }


}
