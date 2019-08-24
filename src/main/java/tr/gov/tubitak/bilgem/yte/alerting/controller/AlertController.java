package tr.gov.tubitak.bilgem.yte.alerting.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.gov.tubitak.bilgem.yte.alerting.model.Alert;
import tr.gov.tubitak.bilgem.yte.alerting.services.AlertService;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
@CrossOrigin("*")
public class AlertController {

    private final AlertService alertService;

    @GetMapping("/alerts")
    public List<Alert> getAlerts() {
        return alertService.getAlerts();
    }

    @GetMapping("/alerts/{id}")
    public Alert getAlert(@PathVariable final Long id) {
        return alertService.getAlert(id);
    }

    @PostMapping("/alerts")
    public void addAlert(@RequestBody final Alert alert) {
        alertService.addAlert(alert);
    }

    @DeleteMapping("/alerts/{id}")
    public @ResponseBody void deleteAlert(@PathVariable final Long id) {
        alertService.deleteAlert(id);
    }

    @PutMapping("/alerts/{id}")
    public Alert updateAlert(@RequestBody final Alert alert, @PathVariable Long id) {
        return alertService.updateAlert(alert, id);
    }
}
