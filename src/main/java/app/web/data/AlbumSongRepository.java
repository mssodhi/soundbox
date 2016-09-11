package app.web.data;

import app.web.domain.AlbumSong;
import app.web.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlbumSongRepository extends JpaRepository<AlbumSong, Integer> {

    @Query("select a from AlbumSong a where a.song.id = ?1")
    public AlbumSong findBySong(Integer id);
}
