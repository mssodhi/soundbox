package app.web.domain.Serializable;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.sql.Blob;

@Component
public class BlobSer extends JsonSerializer<Blob> {

    public BlobSer() {};

    @Override
    public void serialize(Blob blob, JsonGenerator json, SerializerProvider provider) throws IOException {

        try{
            json.writeStartObject();
            json.writeFieldName("artwork");
            String haxString = convertToHexString(blob);
            json.writeStartArray();
            for (int i= 0; i < haxString.length() - 1; i += 2) {
                json.writeNumber(Integer.valueOf(haxString.substring(i, i + 2), 16));
            }
            json.writeEndArray();

            json.writeEndObject();
        }catch (Exception e){
            System.out.println(e);
        }

    }

    private String convertToHexString(java.sql.Blob blob) throws Exception {
        int blobLength = (int) blob.length();
        byte[] bytes = blob.getBytes(1, blobLength);
        return DatatypeConverter.printHexBinary(bytes);
    }
}
