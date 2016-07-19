package app.web.services;

import app.web.domain.Genres;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface GenresService extends BaseService<Genres, Integer> {

    Genres save(Genres genres);

    Set<Genres> getAll();
}
