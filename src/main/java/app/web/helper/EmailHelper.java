package app.web.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

@Component
public class EmailHelper {

    @Value("${mail.smtp.starttls.enable}")
    private String enable;

    @Value("${mail.smtp.host}")
    private String host;

    @Value("${mail.smtp.user}")
    private String from;

    @Value("${mail.smtp.password}")
    private String pass;

    @Value("${mail.smtp.port}")
    private String port;

    @Value("${mail.smtp.auth}")
    private String auth;


    public void sendFromGMail(String[] recipients, String subject, String body) {
        Set<InternetAddress> toAddress = new HashSet<>();
        Properties properties = new Properties();
        properties.put("mail.smtp.starttls.enable", enable);
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.user", from);
        properties.put("mail.smtp.password", pass);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", auth);

        Session session = Session.getDefaultInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(from, pass);
                    }
                });

        MimeMessage message = new MimeMessage(session);

        try {
            message.setFrom(new InternetAddress(from));

            for(String email : recipients){
                toAddress.add(new InternetAddress(email));
            }

            for(InternetAddress internetAddress : toAddress){
                message.addRecipient(Message.RecipientType.TO, internetAddress);
            }

            message.setSubject(subject);
            message.setText(body, "UTF-8", "html");
            Transport.send(message, message.getAllRecipients());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
