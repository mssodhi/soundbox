package app.web.services;

import app.web.data.SongContentRepository;
import app.web.data.SongRepository;
import app.web.domain.Song;
import app.web.domain.SongContent;
import app.web.domain.Analytics;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongContentServiceImpl extends BaseServiceImpl<SongContent,Integer> implements SongContentService {

    @Autowired
    private SongContentRepository repository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongService songService;

    @Autowired
    private AnalyticsService analyticsService;

    @Override
    public SongContent findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public SongContent save(SongContent songContent){
        return repository.save(songContent);
    }

    @Override
    public SongContent findBySong(Song song){
        return repository.findBySong(song.getId());
    }

    @Override
    public Object getSongContentBySong(Integer id) throws Exception{
        Song song = songService.findById(id);

        Analytics analytics = analyticsService.getByUser(song.getUser());
        analytics.setPlays_today(analytics.getPlays_today() + 1);
        analyticsService.save(analytics);

        song.setPlays(song.getPlays() + 1);
        songRepository.save(song);
        return findBySong(song);
    }

}
