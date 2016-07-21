package app.web.controllers;

import app.web.domain.User;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/login/")
public class LoginController {

    @Autowired
    private UserService userService;

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
//            emailService.sendEmail(EmailType.WELCOME, newUser);
            return userService.save(newUser);
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
