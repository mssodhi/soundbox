package app.web.controllers;

import app.web.domain.Settings;
import app.web.domain.User;
import app.web.services.FavoritesService;
import app.web.services.SettingsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    public SettingsService settingsService;

    @Autowired
    FavoritesService favoritesService;

    @RequestMapping(value = "checkAvailability/{email:.+}", method = RequestMethod.GET)
    public String checkAvailability (@PathVariable String email) {

        User user = userService.findByEmail(email);
        if(user != null){
            return "{\"taken\":\"true\"}";
        }else{
            return "{\"taken\":\"false\"}";
        }

    }

    @RequestMapping(value = "addUser", method = RequestMethod.PUT)
    public String addUser (@RequestBody User user) {

        user = userService.save(user);
        userService.setCurrentUser(user.getEmail());
        return userService.toSimpleJson(user);

    }

    @RequestMapping(value = "updateLocation", method = RequestMethod.POST)
    public String updateLocation (@RequestBody String location) {

        User user = userService.getCurrentUser();
        user.setLocation(location);
        user = userService.save(user);
        return userService.toSimpleJson(user);
    }

    @RequestMapping(value = "updateSettings", method = RequestMethod.PUT)
    public String updateSettings (@RequestBody Settings settings) {

        Settings updateSettings = settingsService.findById(settings.getId());
        updateSettings.setNotifications(settings.getNotifications());
        settingsService.save(updateSettings);
        return userService.toSimpleJson(userService.getCurrentUser());
    }

    @RequestMapping(value = "addSettings", method = RequestMethod.POST)
    public String addSettings (@RequestBody Settings settings) {

        User user = userService.getCurrentUser();
        settings.setUser_email(user.getEmail());
        settings.setUser(user);
        settings = settingsService.save(settings);
        user.setSettings(settings);
        user = userService.save(user);
        return userService.toSimpleJson(user);
    }

    @RequestMapping(value = "login/{email:.+}", method = RequestMethod.PUT)
    public Object login(@PathVariable String email, @RequestBody String password){
        User user = userService.findByEmail(email);
        if(user != null){
            if(user.getPassword().equals(password)){
                userService.setCurrentUser(user.getEmail());
                return userService.toSimpleJson(user);
            }else{
                return null;
            }
        }else{
            return null;
        }

    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public void logout(){
        userService.setCurrentUser("");
    }

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(){
        return userService.getCurrentUser();
    }

}