package app.web.services;

import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface FavoritesService extends BaseService<Favorites, Integer> {

    Favorites save(Favorites number);

    Set<Favorites> getByUser(User user);

    Favorites findByUserAndArtist(User user, String artist);

    Boolean delete(Favorites favorites);
}
