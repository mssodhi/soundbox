package app.web.domain;

import app.web.domain.Serializable.BlobSer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "song")
public class Song {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Column(name = "artwork")
    @Lob
    @JsonSerialize(using = BlobSer.class)
    private Blob artwork;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_User"), name = "user_id", referencedColumnName = "id")
    @JsonProperty
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Blob getArtwork() {
        return artwork;
    }

    public void setArtwork(Blob artwork) {
        this.artwork = artwork;
    }
}
