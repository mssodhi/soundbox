package app.web.services;

import app.web.data.CommentsRepository;
import app.web.domain.Comments;
import app.web.domain.Song;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class CommentsServiceImpl extends BaseServiceImpl<Comments, Integer> implements CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Override
    public Comments save(Comments comment){
        return commentsRepository.save(comment);
    }

    @Override
    public Set<Comments> getBySong(Song song){
        return commentsRepository.getBySong(song.getId());
    }
}
