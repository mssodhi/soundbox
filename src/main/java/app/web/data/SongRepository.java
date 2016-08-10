package app.web.data;

import app.web.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface SongRepository extends JpaRepository<Song, Integer> {

    @Query("select s from Song s where s.user.fb_id = ?1")
    Set<Song> getByUser(String id);
}