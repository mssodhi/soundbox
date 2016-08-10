package app.web.services;

import app.web.domain.Songblob;
import app.web.services.Base.BaseService;

public interface SongblobService extends BaseService<Songblob, Integer> {

    Songblob save(Songblob songblob);

    Songblob findById(Integer id);

    Object getSong(Integer id) throws Exception;
}
