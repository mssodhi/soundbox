package app.web.data;

import app.web.domain.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempUserRepository extends JpaRepository<TempUser, Integer> {

}
