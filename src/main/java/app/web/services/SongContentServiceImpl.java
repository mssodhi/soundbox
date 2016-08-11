package app.web.services;

import app.web.data.SongContentRepository;
import app.web.data.SongRepository;
import app.web.domain.Song;
import app.web.domain.SongContent;
import app.web.services.Base.BaseServiceImpl;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.io.StringWriter;
import java.sql.Blob;

@Service
public class SongContentServiceImpl extends BaseServiceImpl<SongContent,Integer> implements SongContentService {

    @Autowired
    private SongContentRepository repository;

    @Autowired
    private SongRepository songRepository;

    @Override
    public SongContent findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public SongContent save(SongContent songContent){
        return repository.save(songContent);
    }

    @Override
    public Object getSong(Integer id) throws Exception{

        SongContent songContent = findById(id);
        Song song = songContent.getSong();
        song.setPlays(song.getPlays() + 1);
        songRepository.save(song);
        
        StringWriter sw = new StringWriter();

        JsonFactory factory = new JsonFactory();
        JsonGenerator json = factory.createGenerator(sw);

        json.writeStartObject();
        json.writeNumberField("id", songContent.getId());
        json.writeNumberField("song_id", songContent.getSong().getId());
        json.writeFieldName("content");
        String haxString = convertToHexString(songContent.getContent());
        json.writeStartArray();
        for (int i= 0; i < haxString.length() - 1; i += 2) {
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
