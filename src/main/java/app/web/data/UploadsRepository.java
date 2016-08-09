package app.web.data;

import app.web.domain.Uploads;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadsRepository extends JpaRepository<Uploads, Integer> {

}