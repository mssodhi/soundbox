package app.web.data;

import app.web.domain.AlbumSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumSongRepository extends JpaRepository<AlbumSong, Integer> {
}
