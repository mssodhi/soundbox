package app.web.services;

import app.web.data.LikesRepository;
import app.web.domain.Likes;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class LikesServiceImpl extends BaseServiceImpl<Likes, Integer> implements LikesService{

    @Autowired
    private LikesRepository likesRepository;

    public Likes findBySongAndUser(String id, User user){
        return likesRepository.findBySongAndUser(id, user.getId());
    }

    public Set<Likes> findByUser(Integer id){
        return likesRepository.findByUser(id);
    }

    public void removeByIdAndUser(String id, User user){
        likesRepository.removeByIdAndUser(id, user.getId());
    }

    public Likes save(Likes likes){
        return likesRepository.save(likes);
    }
}
