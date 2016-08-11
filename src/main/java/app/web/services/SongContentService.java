package app.web.services;

import app.web.domain.Song;
import app.web.domain.SongContent;
import app.web.services.Base.BaseService;

public interface SongContentService extends BaseService<SongContent, Integer> {

    SongContent save(SongContent songContent);

    SongContent findById(Integer id);

    SongContent findBySong(Song song);

    Object getSongContentBySong(Integer id) throws Exception;
}
