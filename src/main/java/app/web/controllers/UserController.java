package app.web.controllers;

import app.web.domain.Settings;
import app.web.domain.User;
import app.web.services.FavoritesService;
import app.web.services.SettingsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    public SettingsService settingsService;

    @Autowired
    FavoritesService favoritesService;

    @RequestMapping(value = "addUser", method = RequestMethod.PUT)
    public String addUser (@RequestBody User user, HttpServletResponse response) {

        user = userService.save(user);
        setCurrentUser(user.getEmail(), response);
        return userService.toSimpleJson(user);

    }

    @RequestMapping(value = "updateLocation/{email:.+}", method = RequestMethod.POST)
    public String updateLocation (@RequestBody String location, @PathVariable String email) {

        User user = userService.findByEmail(email);
        user.setLocation(location);
        user = userService.save(user);
        return userService.toSimpleJson(user);
    }

    @RequestMapping(value = "updateSettings/{email:.+}", method = RequestMethod.PUT)
    public String updateSettings (@RequestBody Settings settings, @PathVariable String email) {

        Settings updateSettings = settingsService.findById(settings.getId());
        updateSettings.setNotifications(settings.getNotifications());
        settingsService.save(updateSettings);

        User user = userService.findByEmail(email);
        return userService.toSimpleJson(user);
    }

    @RequestMapping(value = "addSettings/{email:.+}", method = RequestMethod.POST)
    public String addSettings (@RequestBody Settings settings, @PathVariable String email) {

        User user = userService.findByEmail(email);
        settings.setUser_email(user.getEmail());
        settings.setUser(user);
        settings = settingsService.save(settings);
        user.setSettings(settings);

        user = userService.save(user);
        return userService.toSimpleJson(user);
    }

    @RequestMapping(value = "login/{email:.+}", method = RequestMethod.GET)
    public String login(@PathVariable String email, HttpServletResponse response){
        User user = (User) userService.findByEmail(email);
        if(user != null){
            setCurrentUser(user.getEmail(), response);
            return userService.toSimpleJson(user);
        }
        return null;
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public void logout(HttpServletResponse response){
        setCurrentUser("", response);
    }

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        String cookieValue;
        String userEmail = null;

        if (cookies != null) {
            for(Cookie cookie: cookies){
                if(cookie.getName().equalsIgnoreCase("sandbox_cookie")) {
                    cookieValue = cookie.getValue();
                    userEmail = cookieValue;
                    break;
                }
            }
        }

        return userService.findByEmail(userEmail);

    }

    private void setCurrentUser(String email, HttpServletResponse response){
        Cookie cookie = new Cookie("sandbox_cookie", email);
        cookie.setMaxAge(1000000);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

//    private byte[] encodeMyString(String original) {
//    Charset utf_8 = Charset.forName("UTF-8");
//        return original.getBytes(utf_8);
//    }
//
//    private String decodeMyString(String encodedBytes){
//        byte[] byteText = encodedBytes.getBytes(utf_8);
//        return new String(byteText, utf_8);
//    }
}
