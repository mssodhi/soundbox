package app.web.services;

import app.web.domain.Album;
import app.web.services.Base.BaseService;

public interface AlbumService extends BaseService<Album, Integer> {

    Album save(Album album);

    Album findById(Integer id);
}
