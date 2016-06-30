package app.web.helper;


import app.web.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class CookieHelper {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    @Value("${jwt.io.secret}")
    private String secretKey ;

    public String getEmailFromCookie(){
        Cookie[] cookies = request.getCookies();
        String email = "";
        if (cookies != null) {
            for(Cookie cookie: cookies){
                if(cookie.getName().equalsIgnoreCase("sandbox_cookie")) {
                    email = getEmailFromToken(cookie.getValue());
                    break;
                }
            }
        }
        return email;
    }

    public void setCurrentUser(User user){
        Cookie cookie = new Cookie("sandbox_cookie", createSecretToken(user));
        cookie.setMaxAge(1000000);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    private String createSecretToken(User user){
        String email;
        if(user != null){
            email = user.getEmail();
        }else{
            email = "";
        }

        String issuer = "SYSTEM";
        String subject = "For Login";
        long milis = TimeUnit.HOURS.toMillis(24);

        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder().setId(email)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        //if it has been specified, let's add the expiration
        if (milis >= 0) {
            long expMillis = nowMillis + milis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    private String getEmailFromToken(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .parseClaimsJws(token).getBody();
        return claims.getId();
    }
}
