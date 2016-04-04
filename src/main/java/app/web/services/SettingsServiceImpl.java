package app.web.services;

import app.web.data.SettingsRepository;
import app.web.domain.Settings;
import app.web.services.Base.BaseServiceImpl;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.DataBindingException;
import java.io.StringWriter;

@Service
@Transactional
public class SettingsServiceImpl extends BaseServiceImpl<Settings,Integer> implements SettingsService  {

    @Autowired
    SettingsRepository settingsRepository;

    @Override
    public Settings findById(Integer id){
        return settingsRepository.findOne(id);
    }

    @Override
    public Settings save(Settings Settings){
        return settingsRepository.save(Settings);
    }

    @Override
    public String toSimpleJson(Settings settings) {
        try {
            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);

            json.writeStartObject();
            json.writeNumberField("id", settings.getId());
            json.writeBooleanField("notifications", settings.getNotifications());

            json.writeEndObject();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }
}
