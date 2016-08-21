package app.web.services;

import app.web.domain.AlbumSong;
import app.web.services.Base.BaseService;

public interface AlbumSongService extends BaseService<AlbumSong, Integer> {

    AlbumSong save(AlbumSong albumSong);

    AlbumSong findById(Integer id);
}
