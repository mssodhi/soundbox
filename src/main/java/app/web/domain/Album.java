package app.web.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "album")
public class Album {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty
    private Integer id;

    @JsonProperty
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Person"), name = "user_id", referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "album", orphanRemoval = true)
    @JsonProperty
    private Set<AlbumSong> albumSongSet = new HashSet<>();

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

    public Set<AlbumSong> getAlbumSongSet() {
        return albumSongSet;
    }

    public void setAlbumSongSet(Set<AlbumSong> albumSongSet) {
        this.albumSongSet = albumSongSet;
    }
}
