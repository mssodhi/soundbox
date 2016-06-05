package app.web.data;

import app.web.domain.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TempUserRepository extends JpaRepository<TempUser, Integer> {

    @Query("select t from TempUser t where t.secret = ?1")
    TempUser getUserByCode(String code);

    @Modifying
    @Query("delete from TempUser t where t.email = ?1")
    void deleteUserByEmail(String email);

}
