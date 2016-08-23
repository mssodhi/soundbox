package app.web.services;

import app.web.data.LyricsRepository;
import app.web.domain.Lyrics;
import app.web.domain.Song;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LyricsServiceImpl extends BaseServiceImpl<Lyrics,Integer> implements LyricsService{

    @Autowired
    private LyricsRepository lyricsRepository;

    @Override
    public Lyrics save(Lyrics lyrics){
        return lyricsRepository.save(lyrics);
    }

    @Override
    public Lyrics findById(Integer id){
        return lyricsRepository.findOne(id);
    }

    @Override
    public Lyrics findBySong(Song song){
        return lyricsRepository.findBySong(song.getId());
    }
}