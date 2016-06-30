package app.web.helper;


import app.web.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CookieHelper {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    public String getEmailFromCookie(){

        Cookie[] cookies = request.getCookies();

        String userEmail = null;

        if (cookies != null) {
            for(Cookie cookie: cookies){
                if(cookie.getName().equalsIgnoreCase("sandbox_cookie")) {
                    userEmail = cookie.getValue();
                    break;
                }
            }
        }
        return userEmail;
    }

    public void setCurrentUser(User user){
        String email;
        if(user != null){
            email = user.getEmail();
        }else{
            email = "";
        }

        Cookie cookie = new Cookie("sandbox_cookie", email);
        cookie.setMaxAge(1000000);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
