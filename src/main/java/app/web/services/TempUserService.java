package app.web.services;

import app.web.domain.TempUser;
import app.web.services.Base.BaseService;

public interface TempUserService extends BaseService<TempUser, Integer> {

    TempUser save(TempUser user);

    String toSimpleJson(TempUser user);

    TempUser getUserByCode(String code);

    void deleteTempUser(String email);
}
