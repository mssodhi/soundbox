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
@RequestMapping(value = "/api/settings/")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "getSettings", method = RequestMethod.GET)
    public Object getSettings() {
        User user = userService.getCurrentUser();
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

    @RequestMapping(value = "addSettings", method = RequestMethod.POST)
    public Object addSettings(@RequestBody Settings settings) {
        User user = userService.getCurrentUser();
        settings.setUser(user);
        return settingsService.save(settings);
    }
}
