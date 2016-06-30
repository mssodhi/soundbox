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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {

    @Autowired
    EmailHelper emailHelper;

    @Override
    public void sendEmail(EmailType emailType, TempUser user) throws Exception{

        switch (emailType){
            case VERIFY:
                sendVerify(user);
                break;
            case WELCOME:
                sendWelcome(user);
        }

    }

    private void sendVerify(TempUser user) throws Exception{
        String[] recipients = {user.getEmail()};
        String url = "http://localhost:8080/soundbox/#/verify/" + user.getSecret();
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        /*  next, get the Template  */
        Template t = ve.getTemplate("email-templates/verify-email.vm");

        VelocityContext context = new VelocityContext();
        context.put("user", user);
        context.put("link", url);

        /* now render the template into a StringWriter */
        StringWriter messageBody = new StringWriter();
        t.merge( context, messageBody );

        String subject = "SoundBox Account Verification for " + user.getName();
        emailHelper.sendFromGMail(recipients, subject, messageBody.toString());
    }

    private void sendWelcome(TempUser user) throws Exception{
        String[] recipients = {user.getEmail()};
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        /*  next, get the Template  */
        Template t = ve.getTemplate("email-templates/welcome-email.vm");

        VelocityContext context = new VelocityContext();
        context.put("user", user);
        StringWriter messageBody = new StringWriter();
        t.merge( context, messageBody );

        String subject = "Welcome to Soundbox " + user.getName();
        emailHelper.sendFromGMail(recipients, subject, messageBody.toString());
    }



}
