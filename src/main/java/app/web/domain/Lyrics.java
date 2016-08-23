package app.web.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "lyrics")
public class Lyrics {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @OneToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Song"), name = "song_id", referencedColumnName = "id")
    @JsonProperty
    private Song song;

    @Column(name="text", nullable = false, length = 65535)
    @JsonProperty
    private String text;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
