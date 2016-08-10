package app.web.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Blob;

@Entity
@Table(name = "songblob")
public class Songblob {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @Lob
    @JsonIgnore
    @NotNull
    private Blob blob;

    @OneToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Song"), name = "song_id", referencedColumnName = "id")
    @JsonIgnore
    private Song song;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Blob getBlob() {
        return blob;
    }

    public void setBlob(Blob blob) {
        this.blob = blob;
    }

    @Transient
    @JsonProperty(value = "_size")
    public Long getSize() throws Exception {
        return blob != null ? blob.length() : 0;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }
}
