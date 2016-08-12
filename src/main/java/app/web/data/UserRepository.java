package app.web.data;

import app.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.fb_id = ?1")
    User getByFbId(String id);

    @Query("select u from User u where u.username = ?1")
    User findByUsername(String username);

    @Query("select u from User u where lower(u.username) like %?1% or lower(u.name) like %?1%")
    Set<User> searchByName(String name);
}
