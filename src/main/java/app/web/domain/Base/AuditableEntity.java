package app.web.domain.Base;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class AuditableEntity {

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private Date created_date;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(name = "last_modified_date", nullable = false)
    private Date last_modified_date;

    @PrePersist
    protected void onCreate() {
        last_modified_date = created_date = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        last_modified_date = new Date();
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public Date getLast_modified_date() {
        return last_modified_date;
    }

    public void setLast_modified_date(Date last_modified_date) {
        this.last_modified_date = last_modified_date;
    }
}