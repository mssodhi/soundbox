package app.web.helper;


import app.web.domain.User;
import io.jsonwebtoken.*;
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

    public String getValueFromCookie(){
        Cookie[] cookies = request.getCookies();
        String value = "";
        if (cookies != null) {
            for(Cookie cookie: cookies){
                if(cookie.getName().equalsIgnoreCase("sandbox_cookie")) {
                    value = getValueFromToken(cookie.getValue());
                    break;
                }
            }
        }
        return value;
    }

    public void setCurrentUser(User user){
        Cookie cookie = new Cookie("sandbox_cookie", createSecretToken(user));
        cookie.setMaxAge(1000000);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    private String createSecretToken(User user){
        String fb_id;
        if(user != null){
            fb_id = user.getFb_id();
        }else{
            fb_id = "";
        }

        String issuer = "SYSTEM";
        String subject = "For Login";
        long milis = TimeUnit.DAYS.toMillis(15);

        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder().setId(fb_id)
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

    private String getValueFromToken(String token){
        try{
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .parseClaimsJws(token).getBody();
            return claims.getId();
        }catch (Exception e){
            return null;
        }
    }
}
