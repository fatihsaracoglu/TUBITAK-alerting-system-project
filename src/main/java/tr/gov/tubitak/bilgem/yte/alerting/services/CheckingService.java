package tr.gov.tubitak.bilgem.yte.alerting.services;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import tr.gov.tubitak.bilgem.yte.alerting.model.Alert;
import tr.gov.tubitak.bilgem.yte.alerting.model.AlertDetail;
import tr.gov.tubitak.bilgem.yte.alerting.repository.AlertRepository;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
@EnableAsync
public class CheckingService {

    private final AlertRepository alertRepository;

    @Async
    public void isAccessible(Alert alert) {
        String url = alert.getUrl();

        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            int responseCode = connection.getResponseCode();
            if (responseCode == 200) {
                AlertDetail alertDetail = new AlertDetail(null, 1);
                alert.getAlertDetailSet().add(alertDetail);
                System.out.println("Connection OK");
            } else {
                System.out.println("Connection DENIED");
                AlertDetail alertDetail = new AlertDetail(null, 0);
                alert.getAlertDetailSet().add(alertDetail);
            }
        } catch (IOException ex) {
            System.out.println("Error");
            AlertDetail alertDetail = new AlertDetail(null, 0);
            alert.getAlertDetailSet().add(alertDetail);
        }

        alertRepository.save(alert);
    }

}
