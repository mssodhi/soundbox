package app.web.controllers;

import app.web.domain.User;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "getCurrent", method = RequestMethod.GET)
    public Object getCurrentUser(){
        return userService.getCurrentUser();
    }

    @RequestMapping(value = "pic", method = RequestMethod.POST)
    public Object setPic(@RequestBody String url){
        User user = userService.getCurrentUser();
        user.setPic_url(url);
        return userService.save(user);
    }

}