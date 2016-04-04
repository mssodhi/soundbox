package app.web.services;

import app.web.domain.Settings;
import app.web.services.Base.BaseService;

public interface SettingsService extends BaseService<Settings, Integer> {

    Settings findById(Integer id);

    Settings save(Settings number);

    String toSimpleJson(Settings settings);
}
