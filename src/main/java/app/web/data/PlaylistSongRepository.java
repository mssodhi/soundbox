package app.web.data;

import app.web.domain.PlaylistSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Integer> {

    @Query("select ps from PlaylistSong ps where ps.track_id = ?1 and ps.playlist.id = ?2")
    PlaylistSong findBySongAndPlaylist(String sId, Integer pId);
}
