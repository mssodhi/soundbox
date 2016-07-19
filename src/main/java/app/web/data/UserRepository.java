package app.web.data;

import app.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.email = ?1")
    User findByEmail(String email);

    @Query("select u from User u where u.fb_id = ?1")
    User getByFbId(String id);
}
