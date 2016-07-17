package app.web.data;

import app.web.domain.Genres;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenresRepository extends JpaRepository<Genres, Integer> {
}
