package app.web.data;


import app.web.domain.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {

    @Query("select c from Comments c where c.song.id = ?1")
    Set<Comments> getBySong(Integer id);
}
