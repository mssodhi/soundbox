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

    @RequestMapping(value = "getByEmail/{email:.+}", method = RequestMethod.GET)
    public String getByEmail(@PathVariable String email) {

        User user = userService.findByEmail(email);
        if(user != null){
            return userService.toSimpleJson(user);
        }else{
            return "{\"id\":\"null\"}";
        }
    }

    @RequestMapping(value = "addUser", method = RequestMethod.PUT)
    public String addUser (@RequestBody User user) {

        user = userService.save(user);
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
}
