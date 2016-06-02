package app.web.controllers;

import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.services.FavoritesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequestMapping(value = "/api/favorites/")
public class FavoritesController {

    @Autowired
    UserService userService;

    @Autowired
    FavoritesService favoritesService;

    private String toEnCode = "String_To_EnCode";

    private Charset utf_8 = Charset.forName("UTF-8");


    @RequestMapping(value = "getList", method = RequestMethod.GET)
    public String getFavorites() throws Exception{
        User currentUser = userService.getCurrentUser();
        List<Favorites> favorites = favoritesService.getByEmail(currentUser.getEmail());
        return favoritesService.toSimpleJson(favorites);
    }

    @RequestMapping(value = "addFavorite", method = RequestMethod.PUT)
    public String addFavorite(@RequestBody String artist_id){

        User currentUser = userService.getCurrentUser();

        // make sure the artist isn't already in the favorites list
        if(favoritesService.findByEmailAndArtist(currentUser.getEmail(), artist_id) == null){
            Favorites favorites = new Favorites();
            favorites.setUser(currentUser);
            favorites.setUser_email(currentUser.getEmail());
            favorites.setArtist_id(artist_id);
            return favoritesService.toSimpleJson(favoritesService.save(favorites));
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
    public String testing(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

//        Cookie cookie[]=request.getCookies();
//        String uname="",pass="";
//
//
//
//
//        byte[] encode = encodeMyString(toEnCode);
//
//        Cookie toStore = new Cookie("CustomCookie", encode.toString());
//        toStore.setPath("/");
//        toStore.setMaxAge(10000000);
//        response.addCookie(toStore);
//
//        String originalDecoded = decodeMyString(encode);
//
//        System.out.println("Original: " + toEnCode + ", Encoded: " + encode.toString() + ", Converted: " + originalDecoded);
        return "{\"id\":\"null\"}";
    }

//    private byte[] encodeMyString(String original) {
//
//        return original.getBytes(utf_8);
//    }
//
//    private String decodeMyString(byte[] encodedBytes){
//
//        return new String(encodedBytes, utf_8);
//    }
}
