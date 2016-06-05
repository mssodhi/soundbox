package app.web.services;

import app.web.data.TempUserRepository;
import app.web.domain.TempUser;
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
public class TempUserServiceImpl extends BaseServiceImpl<TempUser,Integer> implements TempUserService {

    @Autowired
    TempUserRepository repository;

    @Override
    public TempUser save(TempUser user){
        return repository.save(user);
    }

    @Override
    public String toSimpleJson(TempUser user) {
        try {
            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);

            json.writeStartObject();
            json.writeNumberField("id", user.getId());
            json.writeStringField("name", user.getName());
            json.writeStringField("email", user.getEmail());
            json.writeStringField("secret", user.getSecret());

            json.writeEndObject();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }
}
