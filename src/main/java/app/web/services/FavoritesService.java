package app.web.services;

import app.web.domain.Favorites;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface FavoritesService extends BaseService<Favorites, Integer> {

    Favorites save(Favorites number);

    Set<Favorites> getByEmail(String email);

    Favorites findByEmailAndArtist(String email, String artist);

    Boolean delete(Favorites favorites);
}
