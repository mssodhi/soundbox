package app.web.services;

import app.web.data.AlbumSongRepository;
import app.web.data.LyricsRepository;
import app.web.data.SongRepository;
import app.web.domain.AlbumSong;
import app.web.domain.Lyrics;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Service
public class SongServiceImpl extends BaseServiceImpl<Song,Integer> implements SongService {

    @Autowired
    private SongRepository repository;

    @Autowired
    private LyricsService lyricsService;

    @Autowired
    private LyricsRepository lyricsRepository;

    @Autowired
    private AlbumSongService albumSongService;

    @Autowired
    private AlbumSongRepository albumSongRepository;

    @Override
    public Song findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public Song save(Song song){
        return repository.save(song);
    }

    @Override
    public Set<Song> searchByName(String name){
        return repository.searchByName(name);
    }

    @Override
    public Set<Song> getMusicByUserAndStatus(User user, Boolean active){
        Set<Song> songs = repository.getByUser(user.getFb_id());
        if(songs.size() > 0){
            if(active){
                return songs.stream().filter(song -> song.getRelease_date().compareTo(new Date()) < 0).collect(toSet());
            }else{
                return songs;
            }
        }else{
            return null;
        }
    }

    @Override
    public void delete(Song song){
        Lyrics lyrics = lyricsService.findBySong(song);
        AlbumSong albumSong = albumSongService.findBySong(song);
        if(lyrics != null){
            lyricsRepository.delete(lyrics);
        }
        if(albumSong != null){
            albumSongRepository.delete(albumSong);
        }
        repository.delete(song);
    }
}
