package app.web.services;

import app.web.data.UserRepository;
import app.web.domain.User;
import app.web.helper.CookieHelper;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public User getByFbId(String id){
        return userRepository.getByFbId(id);
    }

    @Override
    public void setCurrentUser(User user){
        cookieHelper.setCurrentUser(user);
    }

    @Override
    public User save(User user){
        return userRepository.save(user);
    }

}
