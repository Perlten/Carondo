package facade;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import entity.Employee;
import entity.Role;
import java.util.Date;
import security.SharedSecret;

public class TokenFacade {

    public static final int TOKEN_EXPIRE_TIME = 1000 * 60 * 30; //30 min

    public String createToken(Employee emp) throws KeyLengthException, JOSEException {
        String issuer = "Carondo";

        JWSSigner signer = new MACSigner(SharedSecret.getSharedKey());
        Date date = new Date();
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(emp.getEmail())
                .claim("firstName", emp.getFirstName())
                .claim("lastName", emp.getLastName())
                .claim("email", emp.getEmail())
                .claim("role", emp.getRole().toString())
                .claim("id", emp.getId())
                .claim("issuer", issuer)
                .issueTime(date)
                .expirationTime(new Date(date.getTime() + TOKEN_EXPIRE_TIME))
                .build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }
}
