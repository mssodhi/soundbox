package app.web.services;

import app.web.domain.Likes;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface LikesService extends BaseService<Likes, Integer> {

    Likes findBySongAndUser(Song song, User user);
    Set<Likes> findByUser(Integer id);
    Boolean removeLike(Likes likes);
    Likes save(Likes likes);
}
