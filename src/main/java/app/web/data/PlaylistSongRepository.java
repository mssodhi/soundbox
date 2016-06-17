package app.web.data;

import app.web.domain.PlaylistSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Integer> {

}
