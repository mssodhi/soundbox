package app.web.data;

import app.web.domain.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SettingsRepository extends JpaRepository<Settings, Integer> {

    @Query("select s from Settings s where s.user.email = ?1")
    Settings findByEmail(String email);
}
