package app.web.services;

import app.web.domain.Uploads;
import app.web.services.Base.BaseService;

public interface UploadsService extends BaseService<Uploads, Integer> {

    Uploads findById(Integer id);

    Uploads save(Uploads upload);
}
