package app.web.controllers;


import app.web.domain.Likes;
import app.web.domain.User;
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

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public Object get () {
        User user = userService.getCurrentUser();
        Set<Likes> likes = likesService.findByUser(user.getId());
        if(likes.size() > 20){
            // make a list of genres from user's likes
            List<String> list = likes.stream().map(Likes ::getSong_genre).collect(Collectors.toList());

            // making everything lower case so the algorithm isn't case sensitive
            for(int i = 0; i < list.size(); i++){
                list.set(i, list.get(i).toLowerCase());
            }

            // create a Map of genre string with occurrence count in the list
            Map<String, Integer> counts = list.parallelStream().
                    collect(Collectors.toConcurrentMap(
                            w -> w, w -> 1, Integer::sum));

            // put the map keys to a list
            List<String> sortedList = new ArrayList<>(sortByComparator(counts).keySet());

            // now check this sorted list against SC genres and make a suggestion.
//            System.out.println(counts);
//            System.out.println(sortedList);
        }else{
            System.out.println("Likes size less than 21");
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
