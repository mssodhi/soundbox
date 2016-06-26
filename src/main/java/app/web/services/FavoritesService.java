package app.web.services;

import app.web.domain.Favorites;
import app.web.services.Base.BaseService;

import java.util.List;

public interface FavoritesService extends BaseService<Favorites, Integer> {

    Favorites save(Favorites number);

    List<Favorites> getByEmail(String email);

    String toSimpleJson(List<Favorites> favoritesList);

    Favorites findByEmailAndArtist(String email, String artist);

    Boolean delete(Favorites favorites);
}
