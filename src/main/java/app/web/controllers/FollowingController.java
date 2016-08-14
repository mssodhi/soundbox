package app.web.controllers;

import app.web.domain.Following;
import app.web.domain.User;
import app.web.services.FollowingService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/follow/")
public class FollowingController {

    @Autowired
    private UserService userService;

    @Autowired
    private FollowingService followingService;

    @RequestMapping(value = "user/{id}", method = RequestMethod.PUT)
    public Object follow(@RequestBody String artistId, @PathVariable String id){

        User currentUser = userService.getByFbId(id);
        User artist = userService.getByFbId(artistId);
        Following following = followingService.getByUserAndArtist(currentUser, artist);
        if(following == null){
            Following newFollow = new Following();
            newFollow.setUser(currentUser);
            newFollow.setArtist(artist);
            currentUser.setFollowing(currentUser.getFollowing() + 1);
            artist.setFollowers(artist.getFollowers() + 1);
            userService.save(artist);
            userService.save(currentUser);
            return followingService.save(newFollow);
        }else{
            currentUser.setFollowing(currentUser.getFollowing() - 1);
            artist.setFollowers(artist.getFollowers() - 1);
            userService.save(artist);
            userService.save(currentUser);
            followingService.unfollow(following);
            return null;
        }
    }

    @RequestMapping(value = "getFollowing/user/{id}", method = RequestMethod.GET)
    public Object getFollowing(@PathVariable String id){
        User currentUser = userService.getByFbId(id);
        return followingService.getFollowing(currentUser);
    }

    @RequestMapping(value = "getFollowers/user/{id}", method = RequestMethod.GET)
    public Object getFollowers(@PathVariable String id){
        User currentUser = userService.getByFbId(id);
        return followingService.getFollowers(currentUser);
    }

}
