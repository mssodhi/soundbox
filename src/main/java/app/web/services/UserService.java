package app.web.services;

import app.web.domain.User;
import app.web.services.Base.BaseService;

public interface UserService extends BaseService<User, Integer> {

    User findByEmail(String email);

    User save(User number);

    String toSimpleJson(User user);

    User getCurrentUser();

    void setCurrentUser(String email);
}