package app.web.services;

import app.web.data.FavoritesRepository;
import app.web.domain.Favorites;
import app.web.services.Base.BaseServiceImpl;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.DataBindingException;
import java.io.StringWriter;
import java.util.List;

@Service
@Transactional
public class FavoritesServiceImpl extends BaseServiceImpl<Favorites, Integer> implements FavoritesService {

    @Autowired
    FavoritesRepository favoritesRepository;

    @Override
    public Favorites save(Favorites favorites) {
        return favoritesRepository.save(favorites);
    }

    @Override
    public List<Favorites> getByEmail(String email) {
        return favoritesRepository.getByEmail(email);
    }

    @Override
    public String toSimpleJson(Favorites favorites) {
        try {
            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);

            json.writeStartObject();
            json.writeNumberField("id", favorites.getId());

            json.writeEndObject();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }

    @Override
    public String toSimpleJson(List<Favorites> favoritesList) {

        try {

            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);

            json.writeStartArray();

            for (Favorites favorites : favoritesList) {
                json.writeStartObject();
                json.writeStringField("artist_id", favorites.getArtist_id());
                json.writeEndObject();
            }
            json.writeEndArray();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }

    @Override
    public Favorites findByEmailAndArtist(String email, String artist) {
        return favoritesRepository.findByEmailAndArtist(email, artist);
    }

    @Override
    public Boolean delete(Favorites favorites) {
        Boolean ret;
        try {
            favoritesRepository.delete(favorites);
            ret = true;
        } catch (Exception e) {
            e.printStackTrace();
            ret = false;
        }
        return ret;
    }

}
