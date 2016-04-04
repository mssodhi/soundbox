package app.web.domain;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @Column(name = "notifications", nullable = true)
    @JsonProperty
    private Boolean notifications;

    @Column(name = "user_email", nullable = false)
    @JsonProperty
    private String user_email;

    @OneToOne(mappedBy = "settings", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonProperty
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getNotifications() {
        return notifications;
    }

    public void setNotifications(Boolean notifications) {
        this.notifications = notifications;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
