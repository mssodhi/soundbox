package app.web.services;

import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface SongService extends BaseService<Song, Integer> {

    Song findById(Integer id);

    Song save(Song song);

    Set<Song> searchByName(String name);

    Set<Song> getMusicByUser(User user);

    void delete(Song song);
}
