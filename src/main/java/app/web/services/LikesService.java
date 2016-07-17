package app.web.services;

import app.web.domain.Likes;
import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface LikesService extends BaseService<Likes, Integer> {

    Likes findBySongAndUser(String id, User user);
    Set<Likes> findByUser(Integer id);
    void removeByIdAndUser(String id, User user);
    Likes save(Likes likes);
}
