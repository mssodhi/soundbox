package app.web.services;

import app.web.data.UserRepository;
import app.web.domain.User;
import app.web.helper.CookieHelper;
import app.web.services.Base.BaseServiceImpl;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.DataBindingException;
import java.io.StringWriter;

@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<User,Integer> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CookieHelper cookieHelper;

    @Override
    public User findByEmail(String email){

        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    @Override
    public User getCurrentUser(){
        String userEmail = cookieHelper.getEmailFromCookie();
        return findByEmail(userEmail);
    }

    @Override
    public void setCurrentUser(User user){
        cookieHelper.setCurrentUser(user);
    }

    @Override
    public User save(User user){
        return userRepository.save(user);
    }

    @Override
    public String toSimpleJson(User user) {
        try {
            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);

            json.writeStartObject();
            json.writeNumberField("id", user.getId());
            json.writeStringField("name", user.getName());
            json.writeStringField("email", user.getEmail());

            if(user.getSettings() != null) {
                json.writeFieldName("settings");
                json.writeStartObject();
                json.writeNumberField("id", user.getSettings().getId());
                json.writeBooleanField("notifications", user.getSettings().getNotifications());
                json.writeEndObject();
            }

            json.writeEndObject();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }

}
