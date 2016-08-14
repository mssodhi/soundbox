package app.web.helper;

import app.web.services.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AnalyticsHelper {

    @Autowired
    private AnalyticsService analyticsService;

    @Scheduled(cron="0 0 0 * * *")
    public void resetAnalytics() throws Exception{
        analyticsService.resetAnalytics();
    }
}
