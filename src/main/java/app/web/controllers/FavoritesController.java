package app.web.controllers;

import app.web.domain.Favorites;
import app.web.domain.User;
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
    private UserService userService;

    @Autowired
    private FavoritesService favoritesService;

    @RequestMapping(value = "getFavorites", method = RequestMethod.GET)
    public Object getFavorites() throws Exception{
        User currentUser = userService.getCurrentUser();
        if(currentUser != null){
            Set<Favorites> favorites = favoritesService.getByUser(currentUser);
            return favoritesService.toJson(favorites);
        }else{
            return null;
        }
    }

    @RequestMapping(value = "addFavorite", method = RequestMethod.PUT)
    public Object addFavorite(@RequestBody String artist_id){

        User currentUser = userService.getCurrentUser();

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

    @RequestMapping(value = "removeFavorite", method = RequestMethod.PUT)
    public Boolean removeFavorite(@RequestBody String artist_id){
        User currentUser = userService.getCurrentUser();
        Favorites favorites = favoritesService.findByUserAndArtist(currentUser, artist_id);
        return favoritesService.delete(favorites);
    }

    @RequestMapping(value = "testing", method = RequestMethod.PUT)
    public String testing() throws UnsupportedEncodingException {
        return "{\"id\":\"null\"}";
    }

    // HTTP GET request
//    @RequestMapping(value = "testing", method = RequestMethod.GET)
//    public Object sendGet() throws Exception {

//        String url = "https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&client_id=0f7c969c815f51078c1de513f666ecdb&limit=20&offset=0&linked_partitioning=1&app_version=1469103556";
//
//        HttpClient client = new DefaultHttpClient();
//        HttpGet request = new HttpGet(url);
//
//        // add request header
//        request.addHeader("User-Agent", USER_AGENT);
//
//        HttpResponse response = client.execute(request);
//
//        System.out.println("\nSending 'GET' request to URL : " + url);
//        System.out.println("Response Code : " +
//                response.getStatusLine().getStatusCode());
//
//        BufferedReader rd = new BufferedReader(
//                new InputStreamReader(response.getEntity().getContent()));
//
//        String jsonText = readAll(rd);
//        System.out.println(jsonText);
//        return new JSONObject(jsonText).toString();
//        return "{}";

//    }

//    private static String readAll(Reader rd) throws IOException {
//        StringBuilder sb = new StringBuilder();
//        int cp;
//        while ((cp = rd.read()) != -1) {
//            sb.append((char) cp);
//        }
//        return sb.toString();
//    }
}
