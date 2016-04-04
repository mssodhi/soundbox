package app.web.domain.Base;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity <T extends Serializable> extends BaseObject<Id> {

    private static final long serialVersionUID = 1L;

    @CreatedDate
    @Column(name = "created_date", nullable = false, length = 50, updatable = false)
    @JsonProperty
    private DateTime createdDate = DateTime.now();

    @LastModifiedDate
    @Column(name = "last_modified_date", nullable = false,  updatable = true)
    @JsonProperty
    private DateTime lastModifiedDate = DateTime.now();

//    @CreatedBy
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "created_by", referencedColumnName = "id", nullable = false)
//    @JsonSerialize(using = PersonSimpleSerializer.class)
//    private Person createdBy;
//
//    @LastModifiedBy
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "last_modified_by", referencedColumnName = "id", nullable = false)
//    @JsonSerialize(using = PersonSimpleSerializer.class)
//    private Person lastModifiedBy;

    // Properties
    public abstract T getId();

    public DateTime getCreatedDate() { return createdDate; }

    public DateTime getLastModifiedDate() { return lastModifiedDate; }

//    public Person getCreatedBy() { return createdBy; }

//    public Person getLastModifiedBy() { return lastModifiedBy; }

    public void setCreatedDate(DateTime createdDate) { this.createdDate = createdDate; }

    public void setLastModifiedDate(DateTime lastModifiedDate) { this.lastModifiedDate = lastModifiedDate; }

//    public void setCreatedBy(Person createdBy) { this.createdBy = createdBy; }

//    public void setLastModifiedBy(Person lastModifiedBy) { this.lastModifiedBy = lastModifiedBy; }

}