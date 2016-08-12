package app.web.data;

import app.web.domain.Likes;
import app.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface LikesRepository extends JpaRepository<Likes, Integer> {

    @Query("select l from Likes l where l.user.id = ?1")
    Set<Likes> findByUser(Integer id);

    @Query("select l from Likes l where l.song.id = ?1 and l.user.id = ?2")
    Likes findBySongAndUser(Integer id, Integer userId);

}
