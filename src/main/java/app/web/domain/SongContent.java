package app.web.domain;

import app.web.domain.Serializable.BlobSer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "songcontent")
public class SongContent {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @OneToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Song"), name = "song_id", referencedColumnName = "id")
    @JsonIgnore
    private Song song;

    @Column(name = "content")
    @Lob
    @JsonSerialize(using = BlobSer.class)
    private Blob content;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public Blob getContent() {
        return content;
    }

    public void setContent(Blob content) {
        this.content = content;
    }
}
