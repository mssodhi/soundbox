package app.web.data;

import app.web.domain.Lyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LyricsRepository extends JpaRepository<Lyrics, Integer> {

    @Query("select l from Lyrics l where l.song.id = ?1")
    Lyrics findBySong(Integer id);
}
