package app.web.services;

import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface UserService extends BaseService<User, Integer> {

    User save(User number);

    User getCurrentUser();

    User getByFbId(String id);

    void setCurrentUser(User user);

    User findByUsername(String username);

    Set<User> seachByName(String name);
}