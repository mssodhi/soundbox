package app.web.controllers;


import app.web.domain.Genres;
import app.web.domain.Likes;
import app.web.domain.User;
import app.web.services.GenresService;
import app.web.services.LikesService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/recommend/")
public class RecommendController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikesService likesService;

    @Autowired
    private GenresService genresService;

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public Object get () {
        User user = userService.getCurrentUser();
        Set<Likes> likes = likesService.findByUser(user.getId());
        if(likes.size() > 20){
            // make a list of genres from user's likes
            List<String> list = likes.stream().map(l -> l.getSong_genre().toLowerCase()).collect(Collectors.toList());

            // create a Map of genre string with occurrence count in the list
            Map<String, Integer> counts = list.parallelStream().
                    collect(Collectors.toConcurrentMap(
                            w -> w, w -> 1, Integer::sum));

            // put the map keys to a list
            List<String> sortedList = new ArrayList<>(sortByComparator(counts).keySet());

            // now check this sorted list against SC genres and make a suggestion.
            Set<Genres> genres = genresService.getAll();

            Set<String> recommendation = new HashSet<>();
            for(String user_gen: sortedList){
                if(recommendation.size() < 5 && !user_gen.equals("---")){
                    recommendation.add(user_gen);
                }
                for(Genres sc_gen: genres){
                    if((user_gen.equals(sc_gen.getName().toLowerCase()) || user_gen.contains((sc_gen.getName().toLowerCase())) || sc_gen.getName().toLowerCase().contains(user_gen)) && !recommendation.contains(sc_gen.getName().toLowerCase())){
                        recommendation.add(sc_gen.getName().toLowerCase());
                    }
                }
            }
            return recommendation;
        }
        return null;
    }

    private static Map<String, Integer> sortByComparator(Map<String, Integer> unsortMap)
    {

        List<Map.Entry<String, Integer>> list = new LinkedList<Map.Entry<String, Integer>>(unsortMap.entrySet());

        // Sorting the list based on values
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>(){
            public int compare(Map.Entry<String, Integer> o1,
                               Map.Entry<String, Integer> o2)
            {
                return o2.getValue().compareTo(o1.getValue());
            }
        });

        // Maintaining insertion order with the help of LinkedList
        Map<String, Integer> sortedMap = new LinkedHashMap<String, Integer>();
        for (Map.Entry<String, Integer> entry : list)
        {
            sortedMap.put(entry.getKey(), entry.getValue());
        }

        return sortedMap;
    }

}
