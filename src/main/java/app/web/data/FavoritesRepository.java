package app.web.data;

import app.web.domain.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {

    @Query("select f from Favorites f where f.user.fb_id = ?1")
    Set<Favorites> getByUserFbId(String fb_id);

    @Query("select f from Favorites f where f.user.fb_id = ?1 and f.artist_id = ?2")
    Favorites findByFbIdAndArtist(String fb_id, String artist_id);
}
