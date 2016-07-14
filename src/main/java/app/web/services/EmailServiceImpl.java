package app.web.services;

import app.web.domain.Enums.EmailType;
import app.web.domain.TempUser;
import app.web.helper.EmailHelper;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {

    @Autowired
    EmailHelper emailHelper;

    @Autowired
    private Environment environment;

    @Value("${prod.url}")
    private String prod_url;

    @Override
    public void sendEmail(EmailType emailType, TempUser user) throws Exception{

        String[] recipients = {user.getEmail()};
        String subject = "";
        Template template = new Template();

        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();

        VelocityContext context = new VelocityContext();
        context.put("user", user);

        if(emailType.equals(EmailType.VERIFY)){
            template = ve.getTemplate("email-templates/verify-email.vm");
            subject = "SoundBox Account Verification for " + user.getName();
            String url;
            if(environment.getActiveProfiles()[0].equals("local") || environment.getActiveProfiles() == null){
                url = "localhost:8080/soundbox/";
            }else{
                url = prod_url;
            }
            url = url + "/#/verify/" + user.getSecret();
            context.put("link", url);
        }
        if(emailType.equals(EmailType.WELCOME)){
            template = ve.getTemplate("email-templates/welcome-email.vm");
            subject = "Welcome to Soundbox " + user.getName();
        }

         /* now render the template into a StringWriter */
        StringWriter messageBody = new StringWriter();
        template.merge( context, messageBody );
        emailHelper.sendFromGMail(recipients, subject, messageBody.toString());

    }

}
