package app.web.domain;

import app.web.domain.Base.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class TempUser extends AuditableEntity implements Serializable {

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

    @Column(name = "secret", length = 50, nullable = false)
    @JsonProperty
    private  String secret = UUID.randomUUID().toString();

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
}
