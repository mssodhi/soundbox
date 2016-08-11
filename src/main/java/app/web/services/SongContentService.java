package app.web.services;

import app.web.domain.SongContent;
import app.web.services.Base.BaseService;

public interface SongContentService extends BaseService<SongContent, Integer> {

    SongContent save(SongContent songContent);

    SongContent findById(Integer id);

    Object getSong(Integer id) throws Exception;
}
