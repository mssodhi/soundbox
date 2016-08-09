package app.web.services;

import app.web.data.UploadsRepository;
import app.web.domain.Uploads;
import app.web.services.Base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadsServiceImpl extends BaseServiceImpl<Uploads,Integer> implements UploadsService{

    @Autowired
    private UploadsRepository repository;

    @Override
    public Uploads findById(Integer id){
        return repository.findOne(id);
    }

    @Override
    public Uploads save(Uploads upload){
        return repository.save(upload);
    }
}
