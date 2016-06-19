package app.web.data;

import app.web.domain.Favorites;
import app.web.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

    @Query("select p from Playlist p where p.owner.id = ?1")
    Set<Playlist> findByUser(Integer id);

    @Query("select p from Playlist p where p.id = ?1")
    Playlist findById(Integer id);

}
