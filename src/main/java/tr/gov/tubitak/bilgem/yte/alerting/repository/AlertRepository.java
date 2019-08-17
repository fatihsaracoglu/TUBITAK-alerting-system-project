package tr.gov.tubitak.bilgem.yte.alerting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.gov.tubitak.bilgem.yte.alerting.model.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> { }
