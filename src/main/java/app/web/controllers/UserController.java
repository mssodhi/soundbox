package app.web.controllers;

import app.web.domain.User;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(){
        return userService.getCurrentUser();
    }

    @RequestMapping(value = "pic/user/{id}", method = RequestMethod.POST)
    public Object setPic(@RequestBody String url, @PathVariable String id){
        User user = userService.getByFbId(id);
        user.setPic_url(url);
        return userService.save(user);
    }

    @RequestMapping(value = "getByFbId/{id}", method = RequestMethod.GET)
    public Object getByFbId(@PathVariable String id){
        User user = userService.getByFbId(id);
        if(user != null){
            return user;
        }else{
            return null;
        }
    }

}