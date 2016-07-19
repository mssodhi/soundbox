package app.web.services;

import app.web.domain.Enums.EmailType;
import app.web.domain.User;

public interface EmailService{

    void sendEmail(EmailType emailType, User user) throws Exception;
}
