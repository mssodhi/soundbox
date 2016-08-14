package app.web.services;

import app.web.domain.User;
import app.web.domain.Analytics;
import app.web.services.Base.BaseService;

public interface AnalyticsService extends BaseService<Analytics, Integer> {

    Analytics save(Analytics userAnalytics);

    Analytics getByUser(User user);

    void resetAnalytics();
}
