package app.web.data;

import app.web.domain.Favorites;
import app.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {

    @Query("select f from Favorites f where f.user_email = ?1")
    List<Favorites> getByEmail(String email);

    @Query("select f from Favorites f where f.user_email = ?1 and f.artist_id = ?2")
    Favorites findByEmailAndArtist(String email, String artist_id);
}
