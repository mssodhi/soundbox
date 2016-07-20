package app.web.services;

import app.web.data.FavoritesRepository;
import app.web.domain.Favorites;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class FavoritesServiceImpl extends BaseServiceImpl<Favorites, Integer> implements FavoritesService {

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Override
    public Favorites save(Favorites favorites) {
        return favoritesRepository.save(favorites);
    }

    @Override
    public Set<Favorites> getByUser(User user) {
        return favoritesRepository.getByUserFbId(user.getFb_id());
    }

    @Override
    public Favorites findByUserAndArtist(User user, String artist) {
        return favoritesRepository.findByFbIdAndArtist(user.getFb_id(), artist);
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
