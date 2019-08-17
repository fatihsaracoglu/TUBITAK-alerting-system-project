package tr.gov.tubitak.bilgem.yte.alerting.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tr.gov.tubitak.bilgem.yte.alerting.model.Alert;
import tr.gov.tubitak.bilgem.yte.alerting.repository.AlertRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    public List<Alert> getAlerts() {
        return alertRepository.findAll(Sort.by("id"));
    }

    public Alert getAlert(final Long id) {
        return alertRepository.findById(id).get();
    }

    public void addAlert(final Alert alert) {
        alertRepository.save(alert);
    }

    public void deleteAlert(final Long id) {
        alertRepository.deleteById(id);
    }
}
