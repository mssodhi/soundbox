package app.web.domain;

import app.web.domain.Base.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "song")
public class Song extends AuditableEntity implements Serializable{

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty
    private Integer id;

    @Column(name = "title", nullable = false)
    @JsonProperty
    private String title;

    @Column(name = "duration", nullable = false)
    @JsonProperty
    private String duration;

    @Column(name = "plays", nullable = false)
    @JsonProperty
    private Integer plays = 0;

    @Column(name = "likes", nullable = false)
    @JsonProperty
    private Integer likes = 0;

    @Column(name = "artwork_url")
    @JsonProperty
    private String artwork_url;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_User"), name = "user_id", referencedColumnName = "id")
    @JsonProperty
    private User user;

    @Column(name = "song_url")
    @JsonProperty
    private String song_url;

    @Column(name = "comments_length", nullable = false)
    @JsonProperty
    private Integer comments_length = 0;

    @Column(name = "identifier", nullable = false)
    @JsonProperty
    private String identifier = UUID.randomUUID().toString();

    @Column(name = "active", nullable = false)
    @JsonProperty
    private Boolean active = true;

    @Column(name = "has_lyrics")
    @JsonProperty
    private Boolean has_lyrics;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getPlays() {
        return plays;
    }

    public void setPlays(Integer plays) {
        this.plays = plays;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public String getArtwork_url() {
        return artwork_url;
    }

    public void setArtwork_url(String artwork_url) {
        this.artwork_url = artwork_url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSong_url() {
        return song_url;
    }

    public void setSong_url(String song_url) {
        this.song_url = song_url;
    }

    public Integer getComments_length() {
        return comments_length;
    }

    public void setComments_length(Integer comments_length) {
        this.comments_length = comments_length;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getHas_lyrics() {
        return has_lyrics;
    }

    public void setHas_lyrics(Boolean has_lyrics) {
        this.has_lyrics = has_lyrics;
    }
}
