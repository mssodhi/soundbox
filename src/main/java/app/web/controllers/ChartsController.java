package app.web.controllers;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import static org.springframework.http.HttpHeaders.USER_AGENT;

@RestController
@RequestMapping(value = "/api/charts/")
public class ChartsController {

    @Value("${soundcloud.client.id}")
    private String sc_client_id;

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public String get() throws Exception{
        String url = "https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&client_id=" + sc_client_id + "&limit=20&offset=0&linked_partitioning=1&app_version=1469103556";

        HttpClient client = new DefaultHttpClient();
        HttpGet request = new HttpGet(url);

        // add request header
        request.addHeader("User-Agent", USER_AGENT);

        HttpResponse response = client.execute(request);

//        System.out.println("\nSending 'GET' request to URL : " + url);
//        System.out.println("Response Code : " +
//                response.getStatusLine().getStatusCode());

        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));

        String jsonText = readAll(rd);
//        System.out.println(jsonText);
        return new JSONObject(jsonText).toString();
    }

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

}
