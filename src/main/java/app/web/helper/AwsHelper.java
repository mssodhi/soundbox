package app.web.helper;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Component
public class AwsHelper {

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${aws.s3.access.key}")
    private String access_key_id;

    @Value("${aws.s3.secret.key}")
    private String secret_access_key;

    @Value("${aws.s3.key.prefix}")
    private String keyPrefix;

    public String put(MultipartFile file, String keyName, ObjectMetadata objectMetadata) throws Exception{
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(access_key_id, secret_access_key);
        AmazonS3 s3client = new AmazonS3Client(awsCreds);

        try {
            InputStream stream = file.getInputStream();
            keyName = keyPrefix + keyName;
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, keyName, stream, objectMetadata);
            putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
            s3client.putObject(putObjectRequest);
            return s3client.getUrl(bucketName, keyName).toString();
        } catch (AmazonServiceException ase) {
            printError(ase);
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which " +
                    "means the client encountered " +
                    "an internal error while trying to " +
                    "communicate with S3, " +
                    "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
        }
        return null;
    }

    public Boolean delete(String keyName) throws Exception{
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(access_key_id, secret_access_key);
        AmazonS3 s3client = new AmazonS3Client(awsCreds);
        try {
            keyName = keyPrefix + keyName;
            s3client.deleteObject(new DeleteObjectRequest(bucketName, keyName));
            return true;
        } catch (AmazonServiceException ase) {
           printError(ase);
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which " +
                    "means the client encountered " +
                    "an internal error while trying to " +
                    "communicate with S3, " +
                    "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
        }
        return false;
    }

    private void printError(AmazonServiceException ase){
        System.out.println("Caught an AmazonServiceException, which " +
                "means your request made it " +
                "to Amazon S3, but was rejected with an error response" +
                " for some reason.");

        System.out.println("Error Message:    " + ase.getMessage());
        System.out.println("HTTP Status Code: " + ase.getStatusCode());
        System.out.println("AWS Error Code:   " + ase.getErrorCode());
        System.out.println("Error Type:       " + ase.getErrorType());
        System.out.println("Request ID:       " + ase.getRequestId());
    }
}
