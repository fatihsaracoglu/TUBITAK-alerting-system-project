package tr.gov.tubitak.bilgem.yte.alerting.services;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tr.gov.tubitak.bilgem.yte.alerting.model.Alert;
import tr.gov.tubitak.bilgem.yte.alerting.repository.AlertRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
@Configuration
@EnableScheduling
public class CounterService {

    private final AlertRepository alertRepository;
    private final CheckingService checkService;

    @Scheduled(fixedDelay = 1000)
    public void sendData() {
        List<Alert> alertList = alertRepository.findAll();

        for (Alert alert : alertList) {
            if (alert.getCounter() == null) {
                alert.setCounter(alert.getPeriod());
            }

            if (alert.getCounter() == 0) {
                alert.setCounter(alert.getPeriod());
                System.out.println("Checking...");
                checkService.isAccessible(alert);
            } else {
                alert.setCounter(alert.getCounter() - 1);
                alertRepository.save(alert);
                System.out.println(alert.getCounter() + " " + alert.getPeriod());
            }
        }
    }

}
