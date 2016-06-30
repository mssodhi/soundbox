package app.web.controllers;

import app.web.domain.Settings;
import app.web.domain.User;
import app.web.services.SettingsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    public SettingsService settingsService;

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

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(){
        return userService.getCurrentUser();
    }

    @RequestMapping(value = "updatePassword", method = RequestMethod.POST)
    public String updatePassword(@RequestBody User user){
        return userService.toSimpleJson(userService.save(user));
    }

}