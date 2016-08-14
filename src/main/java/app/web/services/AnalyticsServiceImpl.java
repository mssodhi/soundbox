package app.web.services;

import app.web.data.AnalyticsRepository;
import app.web.domain.Analytics;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Set;

@Service
@Transactional
public class AnalyticsServiceImpl extends BaseServiceImpl<Analytics,Integer> implements AnalyticsService {

    @Autowired
    AnalyticsRepository analyticsRepository;

    @Override
    public Analytics save(Analytics analytics){
        return analyticsRepository.save(analytics);
    }

    @Override
    public Analytics getByUser(User user){
        return analyticsRepository.getByUser(user.getFb_id());
    }

    @Override
    public void resetAnalytics(){
        Set<Analytics> analyticsSet = getAllAnalytics();
        for(Analytics analytics : analyticsSet){
            analytics.setPrevious_views_count(analytics.getDaily_views_count());
            analytics.setPlays_today(0);
            analytics.setDaily_views_count(0);
            analytics.setReset_date(new Date());
            save(analytics);
        }
    }

    private Set<Analytics> getAllAnalytics(){
        return analyticsRepository.getAll();
    }
}
