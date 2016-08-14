package app.web.data;

import app.web.domain.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FollowingRepository extends JpaRepository<Following, Integer> {

    @Query("select f from Following f where f.user.fb_id = ?1")
    Set<Following> getByUser(String fb_id);

    @Query("select f from Following f where f.user.fb_id = ?1 and f.artist.fb_id = ?2")
    Following getByUserAndArtist(String user_fb_id, String artist_fb_id);

    @Query("select f from Following f where f.artist.fb_id = ?1")
    Set<Following> getFollowers(String fb_id);
}
