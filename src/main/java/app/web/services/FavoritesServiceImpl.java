package app.web.services;

import app.web.data.FavoritesRepository;
import app.web.domain.Favorites;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

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
    public Set<Favorites> getByEmail(String email) {
        return favoritesRepository.getByEmail(email);
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
