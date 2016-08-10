package app.web.services;

import app.web.data.SongRepository;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SongServiceImpl extends BaseServiceImpl<Song,Integer> implements SongService {

    @Autowired
    private SongRepository repository;

    @Override
    public Song findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public Song save(Song song){
        return repository.save(song);
    }

    @Override
    public Set<Song> getMusicByUser(User user){
        return repository.getByUser(user.getFb_id());
    }
}
