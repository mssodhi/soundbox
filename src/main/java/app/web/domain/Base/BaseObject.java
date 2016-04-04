package app.web.domain.Base;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.Transient;
import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * Most of the code was taken from Sharp-Architecture (C#) http://www.sharparchitecture.net/
 * and JBoss wiki http://community.jboss.org/wiki/AnnotationDrivenEqualsAndHashCode
 *
 * @param <T> the annotation type used to decorate properties that represent the business key(s)
 */
@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        getterVisibility = JsonAutoDetect.Visibility.NONE,
        isGetterVisibility = JsonAutoDetect.Visibility.NONE
)
// Prevents Jackson from trying to set fields with no setter (eg set-one fields or calculated properties)
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseObject<T extends Annotation> implements Serializable {

    private static final long serialVersionUID = 1L;

    // Cache of the fields and methods that make up the business keys
    private static Map<Class<?>, List<AccessibleObject>> businessKeyGlobalCache = Maps.newHashMap();

    private Class<T> businessKeyType;

    private transient Integer cachedHashcode;

    @SuppressWarnings("unchecked")
    private Class<T> getAnnotationType() {
        if (this.businessKeyType == null) {
            Type genericSuperclass = getClass().getGenericSuperclass();
            Class<?> superClass = getClass().getSuperclass();

            while (!superClass.equals(BaseObject.class)) {
                genericSuperclass = superClass.getGenericSuperclass();
                superClass = superClass.getSuperclass();
            }

            ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
            this.businessKeyType = (Class<T>) parameterizedType.getActualTypeArguments()[0];
        }

        return this.businessKeyType;
    }

    @Transient
    public boolean isNew() {
        if (getBusinessKey().isEmpty()) {
            return true;
        }

        for (AccessibleObject prop : getBusinessKey()) {
            try {
                Object businessKeyValue;

                if (prop instanceof Field) {
                    businessKeyValue = ((Field) prop).get(this);
                } else {
                    businessKeyValue = ((Method) prop).invoke(this, (Object[]) null);
                }

                if (businessKeyValue != null) {
                    return false;
                }
            } catch (Exception e) {
                throw new UnsupportedOperationException(e);
            }
        }

        return true;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null || !BaseObject.class.isAssignableFrom(obj.getClass())) {
            return false;
        }

        @SuppressWarnings("unchecked")
        BaseObject<T> compareTo = (BaseObject<T>) obj;
        return getClass().equals(compareTo.getClassUnproxied()) && hasSameObjectSignatureAs(compareTo);
    }

    @Override
    public int hashCode() {
        if (this.cachedHashcode != null) {
            return this.cachedHashcode;
        }

        if (isNew()) {
            this.cachedHashcode = super.hashCode();
        } else {
            HashCodeBuilder builder = new HashCodeBuilder();

            for (AccessibleObject prop : getBusinessKey()) {
                try {
                    if (prop instanceof Field) {
                        builder.append(((Field) prop).get(this));
                    } else {
                        builder.append(((Method) prop).invoke(this, (Object[]) null));
                    }
                } catch (Exception e) {
                    throw new UnsupportedOperationException(e);
                }
            }

            this.cachedHashcode = builder.toHashCode();
        }

        return this.cachedHashcode;
    }

    @Override
    public String toString() {
        if (!getBusinessKey().isEmpty()) {
            ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

            for (AccessibleObject prop : getBusinessKey()) {
                try {
                    String name;
                    Object value;

                    if (prop instanceof Field) {
                        name = ((Field) prop).getName();
                        value = ((Field) prop).get(this);

                    } else {
                        name = ((Method) prop).getName();

                        // Remove the "is" or "get" prefix
                        name = name.replaceFirst("^is|get", "");

                        // Lower case the first character
                        name = name.substring(0, 1).toLowerCase() + name.substring(1);

                        value = ((Method) prop).invoke(this, (Object[]) null);
                    }

                    builder.append(name, value);
                } catch (Exception e) {
                    throw new UnsupportedOperationException(e);
                }
            }

            return builder.toString();
        }

        return super.toString();
    }

    /**
     * When Hibernate proxy's objects, it masks the type of the actual entity object. This wrapper
     * burrows into the proxied object to get its actual type. Although this assumes Hibernate is
     * being used, it doesn't require any Hibernate related dependencies and has no bad side
     * effects if Hibernate isn't being used.
     * Related discussion is at
     * http://groups.google.com/group/sharp-architecture/browse_thread/thread/ddd05f9baede023a
     */
    protected Class<?> getClassUnproxied() {
        return this.getClass();
    }

    protected boolean hasSameObjectSignatureAs(BaseObject<T> compareTo) {
        EqualsBuilder builder = new EqualsBuilder();

        if (!isNew()) {
            for (AccessibleObject prop : getBusinessKey()) {
                try {
                    Object thisValue;
                    Object compareToValue;

                    if (prop instanceof Field) {
                        thisValue = ((Field) prop).get(this);
                        compareToValue = ((Field) prop).get(compareTo);
                    } else {
                        thisValue = ((Method) prop).invoke(this, (Object[]) null);
                        compareToValue = ((Method) prop).invoke(compareTo, (Object[]) null);
                    }

                    if (thisValue != null || compareToValue != null) {
                        builder.append(thisValue, compareToValue);
                    }
                } catch (Exception e) {
                    throw new UnsupportedOperationException(e);
                }
            }

            return builder.isEquals();
        }

        return super.equals(compareTo);
    }

    protected List<AccessibleObject> getBusinessKey() {
        Class<?> clazz = getClassUnproxied();

        List<AccessibleObject> businessKeyCache = businessKeyGlobalCache.get(clazz);

        if (businessKeyCache == null) {
            businessKeyCache = Lists.newArrayList();
            businessKeyGlobalCache.put(clazz, businessKeyCache);

            do {
                for (Field field : clazz.getDeclaredFields()) {
                    Annotation businessKey = field.getAnnotation(getAnnotationType());
                    if (businessKey != null) {
                        field.setAccessible(true);
                        businessKeyCache.add(field);
                    }
                }

                for (Method method : clazz.getDeclaredMethods()) {
                    Annotation businessKey = method.getAnnotation(getAnnotationType());
                    if (businessKey != null) {
                        method.setAccessible(true);
                        businessKeyCache.add(method);
                    }
                }

                clazz = clazz.getSuperclass();
            } while (clazz != null);

            Collections.sort(businessKeyCache, new AccessibleObjectComparator());
        }

        return businessKeyCache;
    }

    private static class AccessibleObjectComparator implements Comparator<AccessibleObject>, Serializable {
        @Override
        public int compare(AccessibleObject prop1, AccessibleObject prop2) {
            boolean prop1IsField = prop1 instanceof Field;
            boolean prop2IsField = prop2 instanceof Field;

            if (!prop1IsField && prop2IsField) {
                return 1;
            } else if (prop1IsField && !prop2IsField) {
                return -1;
            }

            if (prop1IsField) {
                return ((Field) prop1).getName().compareTo(((Field) prop2).getName());
            } else {
                return ((Method) prop1).getName().compareTo(((Method) prop2).getName());
            }
        }
    }

}