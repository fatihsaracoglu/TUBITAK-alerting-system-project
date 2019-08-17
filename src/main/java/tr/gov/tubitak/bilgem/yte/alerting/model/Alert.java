package tr.gov.tubitak.bilgem.yte.alerting.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alert {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String url;
    private String method;
    private Integer period;
    private Integer counter;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "alert_id")
    @OrderBy("id ASC")
    private Set<AlertDetail> alertDetailSet;
}
