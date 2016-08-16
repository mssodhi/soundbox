package app.web.controllers;

import app.web.domain.Comments;
import app.web.domain.Song;
import app.web.services.CommentsService;
import app.web.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/comments/")
public class CommentsController {

    @Autowired
    private SongService songService;

    @Autowired
    private CommentsService commentsService;

    @RequestMapping(value = "song/{id}", method = RequestMethod.GET)
    public Object getComments(@PathVariable Integer id){
        Song song = songService.findById(id);
        return commentsService.getBySong(song);
    }

    @RequestMapping(value = "song/{id}", method = RequestMethod.POST)
    public Object postComment(@PathVariable Integer id, @RequestBody Comments comment){
        Song song = songService.findById(id);
        song.setComments_length(song.getComments_length() + 1);
        song = songService.save(song);
        comment.setSong(song);
        return commentsService.save(comment);
    }
}
