package app.web.services;

import app.web.domain.Enums.EmailType;
import app.web.domain.TempUser;

public interface EmailService{

    void sendEmail(EmailType emailType, TempUser user) throws Exception;
}
