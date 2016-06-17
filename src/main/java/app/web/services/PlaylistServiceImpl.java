package app.web.services;


import app.web.data.PlaylistRepository;
import app.web.data.PlaylistSongRepository;
import app.web.domain.Playlist;
import app.web.domain.PlaylistSong;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class PlaylistServiceImpl extends BaseServiceImpl<Playlist,Integer> implements PlaylistService  {

    @Autowired
    PlaylistRepository repository;

    @Autowired
    PlaylistSongRepository playlistSongRepository;

    @Override
    public Playlist save(Playlist playlist){
        return repository.save(playlist);
    }

    @Override
    public Set<Playlist> findByUser(Integer id){
        return repository.findByUser(id);
    }

    @Override
    public Boolean deletePlaylist(Playlist playlist) {
        try {
            repository.delete(playlist);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public PlaylistSong savePlayListSong(PlaylistSong playlistSong){
        return playlistSongRepository.save(playlistSong);
    }
}
