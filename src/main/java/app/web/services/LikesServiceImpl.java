package app.web.services;

import app.web.data.LikesRepository;
import app.web.domain.Likes;
import app.web.domain.Song;
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

    @Override
    public Likes findBySongAndUser(Song song, User user){
        return likesRepository.findBySongAndUser(song.getId(), user.getId());
    }

    @Override
    public Set<Likes> findByUser(Integer id){
        return likesRepository.findByUser(id);
    }

    @Override
    public Boolean removeLike(Likes likes){
        likesRepository.delete(likes);
        return true;
    }

    @Override
    public Likes save(Likes likes){
        return likesRepository.save(likes);
    }
}
