package app.web.services;

import app.web.domain.Comments;
import app.web.domain.Song;
import app.web.services.Base.BaseService;

import java.util.Set;

public interface CommentsService extends BaseService<Comments, Integer> {

    Comments save(Comments comment);

    Set<Comments> getBySong(Song song);
}
