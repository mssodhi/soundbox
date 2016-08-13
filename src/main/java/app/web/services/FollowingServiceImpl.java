package app.web.services;

import app.web.data.FollowingRepository;
import app.web.domain.Following;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Set<Following> getFollowing(User currentUser){
        return followingRepository.getByUser(currentUser.getFb_id());
    }
}
