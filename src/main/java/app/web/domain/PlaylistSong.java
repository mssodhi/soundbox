package app.web.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "playlistsong")
public class PlaylistSong implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Playlist"), name = "playlist_id", referencedColumnName = "id")
    @JsonProperty
    @ManyToOne
    private Playlist playlist;

    @Column(name = "track_id", nullable = false)
    @JsonProperty
    private String track_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public String getTrack_id() {
        return track_id;
    }

    public void setTrack_id(String track_id) {
        this.track_id = track_id;
    }
}
