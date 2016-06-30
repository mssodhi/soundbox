package app.web.controllers;

import app.web.domain.TempUser;
import app.web.domain.User;
import app.web.helper.EmailHelper;
import app.web.services.TempUserService;
import app.web.services.UserService;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.StringWriter;

@RestController
@RequestMapping(value = "/api/login/")
public class LoginController {

    @Autowired
    public UserService userService;

    @Autowired
    TempUserService tempUserService;

    @Autowired
    EmailHelper emailHelper;

    private VelocityEngine velocityEngine;

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
        // first create a temp user. Once they click the verify link,
        // then you add them to the actual user table
        tempUser = tempUserService.save(tempUser);
        String[] recipients = {tempUser.getEmail()};

        String url = "http://localhost:8080/soundbox/#/verify/" + tempUser.getSecret();
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        /*  next, get the Template  */
        Template t = ve.getTemplate("email-templates/verify-email.vm");

        VelocityContext context = new VelocityContext();
        context.put("user", tempUser);
        context.put("link", url);

        /* now render the template into a StringWriter */
        StringWriter messageBody = new StringWriter();
        t.merge( context, messageBody );

        String subject = "SoundBox Account Verification for " + tempUser.getName();
        emailHelper.sendFromGMail(recipients, subject, messageBody.toString());

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
                userService.setCurrentUser(user);
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
