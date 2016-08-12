package app.web.controllers;


import app.web.domain.DTO.SearchDto;
import app.web.domain.Enums.SearchObjectType;
import app.web.domain.Playlist;
import app.web.domain.Song;
import app.web.domain.User;
import app.web.helper.SearchHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/search/")
public class SearchController {

    @Autowired
    private SearchHelper searchHelper;

    @RequestMapping(value = "query/{q}", method = RequestMethod.GET)
    public Object search(@PathVariable String q){
        Set<User> userSet = searchHelper.searchUsers(q);
        Set<Song> songSet = searchHelper.searchSongs(q);
        Set<Playlist> playlistSet = searchHelper.searchPlaylists(q);

        Set<SearchDto> searchDtoSet = new HashSet<>();

        for(User user : userSet){
            SearchDto searchDto = new SearchDto();
            searchDto.setUser(user);
            searchDto.setObjectType(SearchObjectType.USER);
            searchDtoSet.add(searchDto);
        }
        for(Song song : songSet){
            SearchDto searchDto = new SearchDto();
            searchDto.setObjectType(SearchObjectType.SONG);
            searchDto.setSong(song);
            searchDtoSet.add(searchDto);
        }
        for(Playlist playlist : playlistSet){
            SearchDto searchDto = new SearchDto();
            searchDto.setObjectType(SearchObjectType.PLAYLIST);
            searchDto.setPlaylist(playlist);
            searchDtoSet.add(searchDto);
        }

        return searchDtoSet;
    }

}
