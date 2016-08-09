package app.web.controllers;

import app.web.domain.Uploads;
import app.web.domain.User;
import app.web.services.UploadsService;
import app.web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;

@RestController
@RequestMapping(value = "/api/upload/")
public class UploadController {

    @Autowired
    private UserService userService;

    @Autowired
    private UploadsService uploadsService;

    @RequestMapping(value = "save/user/{id}", method = RequestMethod.POST)
    public Object getSettings(MultipartFile file, @PathVariable String id) throws Exception{
        User user = userService.getByFbId(id);

        Uploads upload = new Uploads();
        upload.setContent(new SerialBlob(file.getBytes()));
        upload.setContentType(file.getContentType());
        upload.setFileName(file.getOriginalFilename());
        upload.setUser(user);
        return uploadsService.save(upload);
    }

}
