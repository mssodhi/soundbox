package app.web.controllers;

import app.web.domain.User;
import app.web.domain.Analytics;
import app.web.services.AnalyticsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/login/")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AnalyticsService analyticsService;

    @RequestMapping(value = "checkUser/{uid}", method = RequestMethod.PUT)
    public Object checkUser(@PathVariable String uid, @RequestBody String name) throws Exception{
        User user = userService.getByFbId(uid);
        if(user != null){
            userService.setCurrentUser(user);
            return user;
        }else{
            User newUser = new User();
            newUser.setFb_id(uid);
            newUser.setName(name);
            userService.setCurrentUser(newUser);
            newUser = userService.save(newUser);
//            emailService.sendEmail(EmailType.WELCOME, newUser);

            Analytics analytics = new Analytics();
            analytics.setUser(newUser);
            analyticsService.save(analytics);
            return newUser;
        }
    }

    @RequestMapping(value = "checkUsername", method = RequestMethod.PUT)
    public Object checkUsername(@RequestBody String username){
        User user = userService.findByUsername(username);
        if(user != null){
            return "{\"taken\":\"true\"}";
        } else{
            return "{\"taken\":\"false\"}";
        }
    }

    @RequestMapping(value = "demo", method = RequestMethod.POST)
    public Object demo(){
        User user = userService.getByFbId("1209");
        userService.setCurrentUser(user);
        return user;
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public void logout(){
        userService.setCurrentUser(null);
    }
}
