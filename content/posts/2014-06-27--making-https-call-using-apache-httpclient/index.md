---
title: Making HTTPS call using Apache HttpClient.
subTitle: Perform Https calls from server using Apache HttpClient library.
postDescription: Perform Https calls from server using Apache HttpClient library.
category: Java
---
This post details about making Secure HTTP(HTTPs) call from a server using Apache HTTPClient library.

The simplest will be to ignore the ssl certificates and to trust any connection. This approach is not acceptable for production code as it defeat the purpose of using HTTPS. However in some use cases if you want to try out something quickly you can go with this route.

#### Trust any certificate approach (Simple, not recommended for production code.)
```java
import javax.net.ssl.SSLContext;
import javax.net.ssl.X509TrustManager;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.security.SecureRandom;

public class HttpClientFactory {

    private static CloseableHttpClient client;

    public static HttpClient getHttpsClient() throws Exception {

        if (client != null) {
            return client;
        }
        SSLContext sslcontext = SSLContexts.custom().useSSL().build();
        sslcontext.init(null, new X509TrustManager\[\]{new HttpsTrustManager()}, new SecureRandom());
        SSLConnectionSocketFactory factory = new SSLConnectionSocketFactory(sslcontext,
                SSLConnectionSocketFactory.BROWSER\_COMPATIBLE\_HOSTNAME\_VERIFIER);
        client = HttpClients.custom().setSSLSocketFactory(factory).build();

        return client;
    }

    public static void releaseInstance() {
        client = null;
    }
}
```
The above method will return httpClient object which can be used to make any HTTPS calls. Performing HTTPS call is no different from making HTTP call from now on. So you can have a factory with two methods, one for secure and one for non-secure.

Here we have used HttpsTrustManager, which will do nothing more than trusing all clients. This is done by simply implementing X509TrustManager and auto generating all the methods.
```java
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

public class HttpsTrustManager implements X509TrustManager {

	@Override
	public void checkClientTrusted(X509Certificate\[\] arg0, String arg1)
			throws CertificateException {
		// TODO Auto-generated method stub

	}

	@Override
	public void checkServerTrusted(X509Certificate\[\] arg0, String arg1)
			throws CertificateException {
		// TODO Auto-generated method stub

	}

	@Override
	public X509Certificate\[\] getAcceptedIssuers() {
		return new X509Certificate\[\]{};
	}

}
```
#### Importing a keystore (Recommended)

If you are writing produciton quality code, then you should be looking at this approach. Have a all the keys in your application and create a SSLContext using those keystores. The created SSLContext can then be injected to SSLConnectionSocketFactory and remaining steps will be the same.
```java
import javax.net.ssl.SSLContext;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.KeyManagementException;

public class HttpClientFactory {

    private static CloseableHttpClient client;

    public static HttpClient getHttpsClient() throws Exception {

        if (client != null) {
            return client;
        }
        SSLContext sslcontext = getSSLContext();
        SSLConnectionSocketFactory factory = new SSLConnectionSocketFactory(sslcontext,
                SSLConnectionSocketFactory.BROWSER\_COMPATIBLE\_HOSTNAME\_VERIFIER);
        client = HttpClients.custom().setSSLSocketFactory(factory).build();

        return client;
    }

    public static void releaseInstance() {
        client = null;
    }

    private SSLContext getSSLContext() throws KeyStoreException, 
    NoSuchAlgorithmException, CertificateException, IOException, KeyManagementException {
        KeyStore trustStore  = KeyStore.getInstance(KeyStore.getDefaultType());
        FileInputStream instream = new FileInputStream(new File("my.keystore"));
        try {
            trustStore.load(instream, "nopassword".toCharArray());
        } finally {
            instream.close();
        }
        return SSLContexts.custom()
                .loadTrustMaterial(trustStore)
                .build();
    }
}
```
The only difference between the two approaches are the way the SSLContext been created.