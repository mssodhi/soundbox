package app.web.data;

import app.web.domain.Genres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface GenresRepository extends JpaRepository<Genres, Integer> {

    @Query("select g from Genres g")
    Set<Genres> getAll();
}
