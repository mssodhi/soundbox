package app.web.controllers;

import app.web.domain.Settings;
import app.web.domain.TempUser;
import app.web.domain.User;
import app.web.helper.EmailHelper;
import app.web.services.FavoritesService;
import app.web.services.SettingsService;
import app.web.services.TempUserService;
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

    @Autowired
    TempUserService tempUserService;

    @Autowired
    EmailHelper emailHelper;

    @RequestMapping(value = "checkAvailability/{email:.+}", method = RequestMethod.GET)
    public String checkAvailability (@PathVariable String email) {

        User user = userService.findByEmail(email);
        TempUser tempUser = tempUserService.getByEmail(email);
        if(user != null || tempUser != null){
            return "{\"taken\":\"true\"}";
        }else{
            return "{\"taken\":\"false\"}";
        }

    }

    @RequestMapping(value = "addUser", method = RequestMethod.PUT)
    public String addUser (@RequestBody TempUser tempUser) {

        // first create a temp user. Once they click the verify link,
        // then you add them to the actual user table
        tempUser = tempUserService.save(tempUser);
        String[] recipients = {tempUser.getEmail()};
        String url = "http://localhost:8080/soundbox/#/verify/" + tempUser.getSecret();
        String messageBody = "<a href="+ url +">Verify Account</a>";
        String subject = "SoundBox Account Verification for " + tempUser.getName();
        emailHelper.sendFromGMail(recipients, subject, messageBody);

        return "{\"code\":\"1\"}";

    }

    @RequestMapping(value = "verify/{secret}", method = RequestMethod.GET)
    public String verifyAccount(@PathVariable String secret){
        // verify temp user and make sure he exists.
        TempUser tempUser = tempUserService.getUserByCode(secret);
        if(tempUser != null){
            // make sure this email isn't being used anywhere
            // checkAvailability should've checked it before, but this
            // is just an extra check to be sure
            if(userService.findByEmail(tempUser.getEmail()) == null){
                // create the user from temp user, save, and then delete temp user
                User user = new User();
                user.setEmail(tempUser.getEmail());
                user.setName(tempUser.getName());
                user.setPassword(tempUser.getPassword());
                user = userService.save(user);
                userService.setCurrentUser(user.getEmail());
                tempUserService.deleteTempUser(tempUser.getEmail());
                return userService.toSimpleJson(user);
            }else{
                // this should never happen. checkAvailability should've
                // checked it already
                System.out.println("User already exists. Verify method." + tempUser.getEmail());
                return null;
            }
        }else{
            return null;
        }

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