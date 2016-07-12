package app.web.controllers;

import app.web.domain.User;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    public UserService userService;

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(){
        return userService.toSimpleJson(userService.getCurrentUser());
    }

    @RequestMapping(value = "updatePassword/{prev}", method = RequestMethod.POST)
    public Object updatePassword(@RequestBody User user, @PathVariable String prev){
        User currentUser = userService.getCurrentUser();
        if(prev.equals(currentUser.getPassword())){
            return userService.toSimpleJson(userService.save(user));
        }else{
            return "{}";
        }
    }

}