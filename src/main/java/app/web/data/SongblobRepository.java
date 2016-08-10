package app.web.data;

import app.web.domain.Songblob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongblobRepository extends JpaRepository<Songblob, Integer> {

}
