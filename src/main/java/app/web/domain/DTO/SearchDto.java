package app.web.domain.DTO;

import app.web.domain.Enums.SearchObjectType;
import app.web.domain.Song;
import app.web.domain.User;

public class SearchDto {

    private User user;

    private Song song;

    private SearchObjectType objectType;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public SearchObjectType getObjectType() {
        return objectType;
    }

    public void setObjectType(SearchObjectType objectType) {
        this.objectType = objectType;
    }
}
