package app.web.domain;

import app.web.domain.Base.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "comments")
public class Comments extends AuditableEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Comment_Song"), name = "song_id", referencedColumnName = "id")
    @JsonProperty
    private Song song;

    @Column(name = "text", length = 1000)
    @JsonProperty
    private String text;

    @OneToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_Artist_User"), name = "author_id", referencedColumnName = "id")
    @JsonProperty
    private User author;

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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
