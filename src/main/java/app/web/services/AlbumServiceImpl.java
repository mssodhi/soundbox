package app.web.services;

import app.web.data.AlbumRepository;
import app.web.domain.Album;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlbumServiceImpl extends BaseServiceImpl<Album,Integer> implements AlbumService{

    @Autowired
    private AlbumRepository albumRepository;

    @Override
    public Album save(Album album){
        return albumRepository.save(album);
    }

    @Override
    public Album findById(Integer id){
        return albumRepository.findOne(id);
    }
}