package app.web.controllers;

import app.web.domain.User;
import app.web.services.AnalyticsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/analytics/")
public class AnalyticsController {

    @Autowired
    private UserService userService;

    @Autowired
    private AnalyticsService analyticsService;

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    public Object getAnalytics(@PathVariable String id) throws Exception{
        User user = userService.getByFbId(id);
        return analyticsService.getByUser(user);
    }
}
