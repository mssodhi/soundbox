package app.web.data;


import app.web.domain.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AnalyticsRepository extends JpaRepository<Analytics, Integer> {

    @Query("select an from Analytics an where an.user.fb_id =?1")
    Analytics getByUser(String fb_id);

    @Query("select an from Analytics an")
    Set<Analytics> getAll();
}
