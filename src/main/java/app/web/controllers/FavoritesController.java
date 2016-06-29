package app.web.controllers;

import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.helper.EmailHelper;
import app.web.services.FavoritesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/favorites/")
public class FavoritesController {

    @Autowired
    UserService userService;

    @Autowired
    FavoritesService favoritesService;

    @Autowired
    EmailHelper emailHelper;

    @RequestMapping(value = "getList", method = RequestMethod.GET)
    public String getFavorites() throws Exception{
        User currentUser = userService.getCurrentUser();
        if(currentUser != null){
            List<Favorites> favorites = favoritesService.getByEmail(currentUser.getEmail());
            return favoritesService.toSimpleJson(favorites);
        }else{
            return null;
        }
    }

    @RequestMapping(value = "addFavorite", method = RequestMethod.PUT)
    public Object addFavorite(@RequestBody String artist_id){

        User currentUser = userService.getCurrentUser();

        // make sure the artist isn't already in the favorites list
        if(favoritesService.findByEmailAndArtist(currentUser.getEmail(), artist_id) == null){
            Favorites favorites = new Favorites();
            favorites.setUser(currentUser);
            favorites.setUser_email(currentUser.getEmail());
            favorites.setArtist_id(artist_id);
            return favoritesService.save(favorites);
        }else{
            return null;
        }
    }

    @RequestMapping(value = "removeFavorite", method = RequestMethod.PUT)
    public Boolean removeFavorite(@RequestBody String artist_id){
        User currentUser = userService.getCurrentUser();
        Favorites favorites = favoritesService.findByEmailAndArtist(currentUser.getEmail(), artist_id);
        return favoritesService.delete(favorites);
    }

    @RequestMapping(value = "testing", method = RequestMethod.PUT)
    public String testing() throws UnsupportedEncodingException {
//        User currentUser = userService.getCurrentUser();
////        String recipient = userService.getCurrentUser().getEmail();
//
//        String recipient = "manu_47555@live.com";
//        String[] to = { recipient }; // list of recipient email addresses
//        String subject = "Welcome to SoundBox " + currentUser.getName();
//        String body = "This is an automated e-mail for " + currentUser.getName() + ". It was sent on " + new DateTime().toDateTime().toLocalDateTime();
//
//        emailHelper.sendFromGMail(to, subject, body);
        return "{\"id\":\"null\"}";
    }

}
