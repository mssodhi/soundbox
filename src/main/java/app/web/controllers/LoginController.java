package app.web.controllers;

import app.web.domain.Enums.EmailType;
import app.web.domain.TempUser;
import app.web.domain.User;
import app.web.helper.EmailHelper;
import app.web.services.EmailService;
import app.web.services.TempUserService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/login/")
public class LoginController {

    @Autowired
    UserService userService;

    @Autowired
    TempUserService tempUserService;

    @Autowired
    EmailHelper emailHelper;

    @Autowired
    private EmailService emailService;

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
    public String addUser (@RequestBody TempUser tempUser) throws Exception {
        tempUser = tempUserService.save(tempUser);
        emailService.sendEmail(EmailType.VERIFY, tempUser);
        return "{\"code\":\"1\"}";
    }

    @RequestMapping(value = "verify/{secret}", method = RequestMethod.GET)
    public Object verifyAccount(@PathVariable String secret) throws Exception{
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
                userService.setCurrentUser(user);
                emailService.sendEmail(EmailType.WELCOME, tempUser);
                tempUserService.deleteTempUser(tempUser.getEmail());
                return user;
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

    @RequestMapping(value = "user/{email:.+}", method = RequestMethod.PUT)
    public Object login(@PathVariable String email, @RequestBody String password){
        User user = userService.findByEmail(email);
        if(user != null){
            if(user.getPassword().equals(password)){
                userService.setCurrentUser(user);
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
        userService.setCurrentUser(null);
    }
}
