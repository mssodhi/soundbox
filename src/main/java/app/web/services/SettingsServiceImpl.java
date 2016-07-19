package app.web.services;

import app.web.data.SettingsRepository;
import app.web.domain.Settings;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SettingsServiceImpl extends BaseServiceImpl<Settings,Integer> implements SettingsService  {

    @Autowired
    private SettingsRepository settingsRepository;

    @Override
    public Settings findById(Integer id){
        return settingsRepository.findOne(id);
    }

    @Override
    public Settings save(Settings Settings){
        return settingsRepository.save(Settings);
    }

    @Override
    public Settings findByEmail(String email){
        return settingsRepository.findByEmail(email);
    }

}
