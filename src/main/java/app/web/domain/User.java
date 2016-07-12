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

    @Column(name = "email", length = 50, nullable = false, unique = true)
    @JsonProperty
    private String email;

    @Column(name = "password", length = 50, nullable = false)
    @JsonProperty
    private  String password;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey =  @ForeignKey(name ="FK_User_Settings"), name = "settings_id", referencedColumnName = "id")
    @JsonProperty
    private Settings settings;

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

    public Settings getSettings() {
        return settings;
    }

    public void setSettings(Settings settings) {
        this.settings = settings;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
