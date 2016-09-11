package app.web.services;

import app.web.data.AlbumSongRepository;
import app.web.domain.AlbumSong;
import app.web.domain.Song;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlbumSongServiceImpl extends BaseServiceImpl<AlbumSong,Integer> implements AlbumSongService{

    @Autowired
    private AlbumSongRepository albumSongRepository;

    @Override
    public AlbumSong save(AlbumSong albumSong){
        return albumSongRepository.save(albumSong);
    }

    @Override
    public AlbumSong findById(Integer id){
        return albumSongRepository.findOne(id);
    }

    @Override
    public AlbumSong findBySong(Song song){
        return albumSongRepository.findBySong(song.getId());
    }
}