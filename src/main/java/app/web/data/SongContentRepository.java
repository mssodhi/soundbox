package app.web.data;

import app.web.domain.SongContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SongContentRepository extends JpaRepository<SongContent, Integer> {

    @Query("select s from SongContent s where s.song.id = ?1")
    SongContent findBySong(Integer id);
}
