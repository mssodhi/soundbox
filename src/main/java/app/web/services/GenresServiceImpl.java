package app.web.services;

import app.web.data.GenresRepository;
import app.web.domain.Genres;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class GenresServiceImpl extends BaseServiceImpl<Genres, Integer> implements GenresService {

    @Autowired
    GenresRepository genresRepository;

    @Override
    public Genres save(Genres genres) {
        return genresRepository.save(genres);
    }

    @Override
    public Set<Genres> getAll() {
        return genresRepository.getAll();
    }

}
