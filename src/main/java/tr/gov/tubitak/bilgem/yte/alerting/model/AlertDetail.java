package tr.gov.tubitak.bilgem.yte.alerting.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlertDetail {

    @Id
    @GeneratedValue
    private Long id;
    private Integer status;
}
