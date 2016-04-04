package app.web.data;

import app.web.data.Base.CustomJpaRepository;
import app.web.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.email = ?1")
    List<User> findByEmail(String email);

}
