package app.web.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "analytics")
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty
    private Integer id;

    @OneToOne
    @JoinColumn(foreignKey = @ForeignKey(name ="FK_User"), name = "user_id", referencedColumnName = "id")
    @JsonProperty
    private User user;

    @Column(name = "daily_views_count", nullable = false)
    @JsonProperty
    private Integer daily_views_count = 0;

    @Column(name = "previous_views_count", nullable = false)
    @JsonProperty
    private Integer previous_views_count = 0;

    @Column(name = "plays_today", nullable = false)
    @JsonProperty
    private Integer plays_today = 0;

    @Column(name = "reset_date", nullable = false)
    @JsonProperty
    private Date reset_date = new Date();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getDaily_views_count() {
        return daily_views_count;
    }

    public void setDaily_views_count(Integer daily_views_count) {
        this.daily_views_count = daily_views_count;
    }

    public Integer getPrevious_views_count() {
        return previous_views_count;
    }

    public void setPrevious_views_count(Integer previous_views_count) {
        this.previous_views_count = previous_views_count;
    }

    public Integer getPlays_today() {
        return plays_today;
    }

    public void setPlays_today(Integer plays_today) {
        this.plays_today = plays_today;
    }

    public Date getReset_date() {
        return reset_date;
    }

    public void setReset_date(Date reset_date) {
        this.reset_date = reset_date;
    }
}
