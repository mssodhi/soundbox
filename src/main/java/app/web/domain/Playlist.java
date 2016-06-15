package app.web.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "playlist")
public class Playlist implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @JsonProperty
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Person"), name = "user_id", referencedColumnName = "id")
    private User owner;

    @Column(name = "is_private", nullable = false)
    @JsonProperty
    private Boolean is_private;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL)
    @JsonProperty
    private Set<PlaylistSong> songs;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Boolean getIs_private() {
        return is_private;
    }

    public void setIs_private(Boolean is_private) {
        this.is_private = is_private;
    }

    public Set<PlaylistSong> getSongs() {
        return songs;
    }

    public void setSongs(Set<PlaylistSong> songs) {
        this.songs = songs;
    }
}
