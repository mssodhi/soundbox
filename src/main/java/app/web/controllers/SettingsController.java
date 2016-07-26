package app.web.controllers;

import app.web.domain.Settings;
import app.web.domain.User;
import app.web.services.SettingsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/settings/")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "getSettings/user/{id}", method = RequestMethod.GET)
    public Object getSettings(@PathVariable String id) {
        User user = userService.getByFbId(id);
        if (user != null) {
            return settingsService.findByUser(user);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "updateSettings", method = RequestMethod.PUT)
    public Object updateSettings(@RequestBody Settings settings) {
        return settingsService.save(settings);
    }

    @RequestMapping(value = "addSettings/user/{id}", method = RequestMethod.POST)
    public Object addSettings(@RequestBody Settings settings, @PathVariable String id) {
        User user = userService.getByFbId(id);
        settings.setUser(user);
        return settingsService.save(settings);
    }
}
