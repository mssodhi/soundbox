package app.web.services.Base;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.io.StringWriter;
import java.util.List;
import java.util.Set;

public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {

    private static final Logger LOG = LoggerFactory.getLogger(BaseServiceImpl.class);

    protected static final ObjectMapper MAPPER = new ObjectMapper();

    protected static final String JSON_CLASS = "clazz";

    static {
        MAPPER.registerModule(new JodaModule());
        MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS , false);
    }

    @Override
    public String toJson(T item) throws Exception {
        StringWriter sw = new StringWriter();
        MAPPER.writeValue(sw, item);
        return sw.toString();
    }

    @Override
    public String toJson(List<T> items) throws Exception {
        StringWriter sw = new StringWriter();
        MAPPER.writeValue(sw, items);
        return sw.toString();
    }

    @Override
    public String toJson(Set<T> items) throws Exception {
        StringWriter sw = new StringWriter();
        MAPPER.writeValue(sw, items);
        return sw.toString();
    }

    @Override
    public <E extends Enum> String toJson(T item, Set<E> permissions) {
        JsonNode tree = MAPPER.valueToTree(item);
        ArrayNode arrayNode = ((ObjectNode) tree).putArray("$permissions");
        for (E permission : permissions) {
            arrayNode.add(permission.toString());
        }

        return tree.toString();
    }

}
