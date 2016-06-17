package app.web.services;


import app.web.domain.Playlist;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface PlaylistService extends BaseService<Playlist, Integer> {

    Set<Playlist> findByUser(Integer id);

    Playlist save(Playlist playlist);

    Boolean deletePlaylist(Playlist playlist);

}