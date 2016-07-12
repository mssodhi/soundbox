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
import java.util.Set;

@RestController
@RequestMapping(value = "/api/favorites/")
public class FavoritesController {

    @Autowired
    UserService userService;

    @Autowired
    FavoritesService favoritesService;

    @Autowired
    EmailHelper emailHelper;

    @RequestMapping(value = "getFavorites", method = RequestMethod.GET)
    public Object getFavorites() throws Exception{
        User currentUser = userService.getCurrentUser();
        if(currentUser != null){
            Set<Favorites> favorites = favoritesService.getByEmail(currentUser.getEmail());
            return favoritesService.toJson(favorites);
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
        return "{\"id\":\"null\"}";
    }

}
