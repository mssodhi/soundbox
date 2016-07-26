package app.web.controllers;

import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.services.FavoritesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/favorites/")
public class FavoritesController {

    @Autowired
    private UserService userService;

    @Autowired
    private FavoritesService favoritesService;

    @RequestMapping(value = "getFavorites/user/{id}", method = RequestMethod.GET)
    public Object getFavorites(@PathVariable String id) throws Exception{
        User currentUser = userService.getByFbId(id);
        if(currentUser != null){
            Set<Favorites> favorites = favoritesService.getByUser(currentUser);
            return favoritesService.toJson(favorites);
        }else{
            return null;
        }
    }

    @RequestMapping(value = "addFavorite/user/{id}", method = RequestMethod.PUT)
    public Object addFavorite(@RequestBody String artist_id, @PathVariable String id){

        User currentUser = userService.getByFbId(id);

        // make sure the artist isn't already in the favorites list
        if(favoritesService.findByUserAndArtist(currentUser, artist_id) == null){
            Favorites favorites = new Favorites();
            favorites.setUser(currentUser);
            favorites.setArtist_id(artist_id);
            return favoritesService.save(favorites);
        }else{
            return null;
        }
    }

    @RequestMapping(value = "removeFavorite/user/{id}", method = RequestMethod.PUT)
    public Boolean removeFavorite(@RequestBody String artist_id, @PathVariable String id){
        User currentUser = userService.getByFbId(id);
        Favorites favorites = favoritesService.findByUserAndArtist(currentUser, artist_id);
        return favoritesService.delete(favorites);
    }

    @RequestMapping(value = "testing", method = RequestMethod.PUT)
    public String testing() throws UnsupportedEncodingException {
        return "{\"id\":\"null\"}";
    }

}
