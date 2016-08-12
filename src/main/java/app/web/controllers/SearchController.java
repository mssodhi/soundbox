package app.web.controllers;


import app.web.domain.DTO.SearchDto;
import app.web.domain.Enums.SearchObjectType;
import app.web.domain.User;
import app.web.helper.SearchHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/search/")
public class SearchController {

    @Autowired
    private SearchHelper searchHelper;

    @RequestMapping(value = "query/{q}", method = RequestMethod.GET)
    public Object search(@PathVariable String q){
        Set<User> userSet = searchHelper.searchUsers(q);
        Set<SearchDto> searchDtoSet = new HashSet<>();

        for(User user : userSet){
            SearchDto searchDto = new SearchDto();
            searchDto.setUser(user);
            searchDto.setObjectType(SearchObjectType.USER);
            searchDtoSet.add(searchDto);
        }

        return searchDtoSet;
    }

}
