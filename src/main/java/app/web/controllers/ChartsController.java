package app.web.controllers;

import app.web.services.GenresService;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Value("${charts.limit}")
    private String limit;

    @Autowired
    private GenresService genresService;

    @RequestMapping(value = "getByGenre", method = RequestMethod.PUT)
    public String getByGenre(@RequestBody String genre) throws Exception{
        String url = "https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3A"+ genre +"&client_id=" + sc_client_id + "&limit=" + limit + "&offset=0&linked_partitioning=1&app_version=1469103556";

        HttpClient client = new DefaultHttpClient();
        HttpGet request = new HttpGet(url);
        request.addHeader("User-Agent", USER_AGENT);

        HttpResponse response = client.execute(request);
        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        return new JSONObject(readAll(rd)).toString();
    }

    @RequestMapping(value = "getGenres", method = RequestMethod.GET)
    public Object getGeneres(){
        return genresService.getAll();
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
