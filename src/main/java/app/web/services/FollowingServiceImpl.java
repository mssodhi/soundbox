package app.web.services;

import app.web.data.FollowingRepository;
import app.web.domain.Following;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class FollowingServiceImpl extends BaseServiceImpl<Following, Integer> implements FollowingService {

    @Autowired
    private FollowingRepository followingRepository;

    @Override
    public Following save(Following following) {
        return followingRepository.save(following);
    }

    @Override
    public Following getByUserAndArtist(User currentUser, User artist){
        return followingRepository.getByUserAndArtist(currentUser.getFb_id(), artist.getFb_id());
    }

    @Override
    public void unfollow(Following following){
        followingRepository.delete(following);
    }

    @Override
    public Set<User> getFollowing(User currentUser){
        Set<Following> followingSet = followingRepository.getByUser(currentUser.getFb_id());
        Set<User> following = new HashSet<>();
        for(Following obj : followingSet){
            User artist = obj.getArtist();
            following.add(artist);
        }
        return following;
    }

    @Override
    public Set<User> getFollowers(User currentUser){
        Set<Following> followingSet = followingRepository.getFollowers(currentUser.getFb_id());
        Set<User> followers = new HashSet<>();
        for(Following following: followingSet){
            User user = following.getUser();
            followers.add(user);
        }
        return followers;
    }
}
