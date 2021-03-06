package app.web.controllers;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.DataBindingException;
import java.io.StringWriter;

@RestController
@RequestMapping(value = "/api/credentials/")
public class CredentialsController {

//    @Value("${soundcloud.client.id}")
//    private String sc_client_id;
//
//    @Value("${soundcloud.client.secret}")
//    private String sc_client_secret;

    @Value("${fb.app.id}")
    private String fb_app_id;

    @Value("${fb.app.secret}")
    private String fb_app_secret;

    @Value("${fb.app.version}")
    private String fb_app_version;

    @RequestMapping(value = "getFacebook", method = RequestMethod.GET)
    public String getCredentials() throws Exception {
        try {
            StringWriter sw = new StringWriter();

            JsonFactory factory = new JsonFactory();
            JsonGenerator json = factory.createGenerator(sw);
            json.writeStartObject();
            json.writeStringField("app_id", fb_app_id);
            json.writeStringField("app_secret", fb_app_secret);
            json.writeStringField("app_version", fb_app_version);
            json.writeEndObject();
            json.close();

            return sw.toString();
        } catch (Exception e) {
            throw new DataBindingException(e);
        }
    }

//    @RequestMapping(value = "getSoundCloud", method = RequestMethod.GET)
//    public String getSoundCloudCredentials() throws Exception {
//        try {
//            StringWriter sw = new StringWriter();
//
//            JsonFactory factory = new JsonFactory();
//            JsonGenerator json = factory.createGenerator(sw);
//            json.writeStartObject();
//            json.writeStringField("id", sc_client_id);
//            json.writeStringField("secret", sc_client_secret);
//            json.writeEndObject();
//            json.close();
//
//            return sw.toString();
//        } catch (Exception e) {
//            throw new DataBindingException(e);
//        }
//    }

}
