package app.web.services;

import app.web.domain.Enums.EmailType;
import app.web.domain.User;
import app.web.helper.EmailHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {

    @Autowired
    private EmailHelper emailHelper;

    @Value("${site.url}")
    private String url;

    @Override
    public void sendEmail(EmailType emailType, User user) throws Exception{

//        String[] recipients = {user.getEmail()};
//        String subject = "";
//        Template template = new Template();
//
//        VelocityEngine ve = new VelocityEngine();
//        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
//        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
//        ve.init();
//
//        VelocityContext context = new VelocityContext();
//        context.put("user", user);
//
//        if(emailType.equals(EmailType.WELCOME)){
//            template = ve.getTemplate("email-templates/welcome-email.vm");
//            subject = "Welcome to Soundbox " + user.getName();
//        }
//
//         /* now render the template into a StringWriter */
//        StringWriter messageBody = new StringWriter();
//        template.merge( context, messageBody );
//        emailHelper.sendFromGMail(recipients, subject, messageBody.toString());

    }

}
