package callable;

import dto.CarDTO;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


public class URLRequest {

    
 public String request(String url) throws Exception {
        URL siteURL = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) siteURL.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/json;charset=UTF-8");
        connection.setRequestProperty("User-Agent", "server");

        //waits 60 seconds
        connection.setConnectTimeout(60 * 1000);
        connection.connect();

        int code = connection.getResponseCode();
        if (code != 200) {
            System.out.println(url + ": " + code);
            return null;
        }
        if (code == 200) {
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
            br.close();
            return sb.toString();
        }
        return null;
    }
    
}
