package app.web.services;

import app.web.data.SongblobRepository;
import app.web.domain.Songblob;
import app.web.services.Base.BaseServiceImpl;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.io.StringWriter;
import java.sql.Blob;

@Service
public class SongblobServiceImpl extends BaseServiceImpl<Songblob,Integer> implements SongblobService{

    @Autowired
    private SongblobRepository repository;

    @Override
    public Songblob findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public Songblob save(Songblob songblob){
        return repository.save(songblob);
    }

    @Override
    public Object getSong(Integer id) throws Exception{

        Songblob songblob = findById(id);

        StringWriter sw = new StringWriter();

        JsonFactory factory = new JsonFactory();
        JsonGenerator json = factory.createGenerator(sw);

        json.writeStartObject();
        json.writeNumberField("id", songblob.getId());
        json.writeNumberField("song_id", songblob.getSong().getId());
        json.writeFieldName("content");
        String haxString = convertToHexString(songblob.getBlob());
        json.writeStartArray();
        for (int i= 0; i < haxString.length() - 1; i += 2) {
            // convert into 8-bit unsigned integers
            json.writeNumber(Integer.valueOf(haxString.substring(i, i + 2), 16));
        }
        json.writeEndArray();

        json.writeEndObject();
        json.close();

        return sw.toString();
    }

    private String convertToHexString(Blob blob) throws Exception {
        int blobLength = (int) blob.length();
        byte[] bytes = blob.getBytes(1, blobLength);
        return DatatypeConverter.printHexBinary(bytes);
    }

}
