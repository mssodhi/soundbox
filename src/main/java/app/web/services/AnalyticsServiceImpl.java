package app.web.services;

import app.web.data.AnalyticsRepository;
import app.web.domain.User;
import app.web.domain.Analytics;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
