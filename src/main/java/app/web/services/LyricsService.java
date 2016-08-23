package app.web.services;

import app.web.domain.Lyrics;
import app.web.domain.Song;
import app.web.services.Base.BaseService;

public interface LyricsService extends BaseService<Lyrics, Integer> {

    Lyrics save(Lyrics lyrics);

    Lyrics findById(Integer id);

    Lyrics findBySong(Song song);
}
