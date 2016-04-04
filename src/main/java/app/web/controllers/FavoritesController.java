package app.web.controllers;

import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.services.FavoritesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/favorites/")
public class FavoritesController {

    @Autowired
    UserService userService;

    @Autowired
    FavoritesService favoritesService;

    @RequestMapping(value = "getList/{email:.+}", method = RequestMethod.GET)
    public String getFavorites(@PathVariable String email) throws Exception{
        List<Favorites> favorites = favoritesService.getByEmail(email);
        return favoritesService.toSimpleJson(favorites);
    }

    @RequestMapping(value = "addFavorite/{email:.+}", method = RequestMethod.PUT)
    public String addFavorite(@RequestBody String artist_id, @PathVariable String email){

        User user = userService.findByEmail(email);

        // make sure the artist isn't already in the favorites list
        if(favoritesService.findByEmailAndArtist(email, artist_id) == null){
            Favorites favorites = new Favorites();
            favorites.setUser(user);
            favorites.setUser_email(user.getEmail());
            favorites.setArtist_id(artist_id);
            favorites = favoritesService.save(favorites);

            return favoritesService.toSimpleJson(favorites);
        }else{
            return null;
        }

    }

    @RequestMapping(value = "removeFavorite/{email:.+}", method = RequestMethod.PUT)
    public Boolean removeFavorite(@RequestBody String artist_id, @PathVariable String email){
        Favorites favorites = favoritesService.findByEmailAndArtist(email, artist_id);
        return favoritesService.delete(favorites);
    }
}
