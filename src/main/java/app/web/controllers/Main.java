package app.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class Main {

    @RequestMapping("/")
    private String index() {
        return "index";
    }

}