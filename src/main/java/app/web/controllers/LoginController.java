package app.web.controllers;

import app.web.domain.Enums.EmailType;
import app.web.domain.User;
import app.web.services.EmailService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/login/")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "checkUser/{uid}/email/{email:.+}", method = RequestMethod.PUT)
    public Object checkUser(@PathVariable String uid, @PathVariable String email, @RequestBody String name) throws Exception{
        User user = userService.getByFbId(uid);
        if(user != null){
            userService.setCurrentUser(user);
            return user;
        }else{
            User newUser = new User();
            newUser.setFb_id(uid);
            newUser.setName(name);
            newUser.setEmail(email);
            userService.setCurrentUser(newUser);
            emailService.sendEmail(EmailType.WELCOME, newUser);
            return userService.save(newUser);
        }
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public void logout(){
        userService.setCurrentUser(null);
    }
}
