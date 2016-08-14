package app.web.services;

import app.web.domain.Following;
import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface FollowingService extends BaseService<Following, Integer> {

    Following save(Following following);

    Following getByUserAndArtist(User currentUser, User artist);

    void unfollow(Following following);

    Set<User> getFollowing(User currentUser);

    Set<User> getFollowers(User currentUser);
}
