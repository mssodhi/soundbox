package app.web.domain;

import app.web.domain.Base.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
public class User extends AuditableEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @Column(name = "name", length = 50, nullable = false)
    @JsonProperty
    private String name;

    @Column(name = "email", length = 50, unique = true)
    @JsonProperty
    private String email;

    @Column(name = "fb_id", length = 50, nullable = false, unique = true)
    @JsonProperty
    private String fb_id;

    @Column(name = "pic_url", length = 225)
    @JsonProperty
    private String pic_url;

    @Column(name = "username", length = 50)
    @JsonProperty
    private String username;

    @Column(name = "songs_length", nullable = false)
    @JsonProperty
    private Integer songs_length = 0;

    @Column(name = "following", nullable = false)
    @JsonProperty
    private Integer following = 0;

    @Column(name = "followers", nullable = false)
    @JsonProperty
    private Integer followers = 0;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFb_id() {
        return fb_id;
    }

    public void setFb_id(String fb_id) {
        this.fb_id = fb_id;
    }

    public String getPic_url() {
        return pic_url;
    }

    public void setPic_url(String pic_url) {
        this.pic_url = pic_url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getSongs_length() {
        return songs_length;
    }

    public void setSongs_length(Integer songs_length) {
        this.songs_length = songs_length;
    }

    public Integer getFollowing() {
        return following;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }
}
