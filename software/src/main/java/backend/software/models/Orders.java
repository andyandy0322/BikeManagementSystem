package backend.software.models;

import java.time.LocalDate;
import java.util.*;

import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedBy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Table
@Entity
public class Orders {

    public Orders(){}
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "dateOfPurchase")
    @NotNull(message = "Date of Purchase cannot be null!")
    private LocalDate dateOfPurchase;

    @Column(name = "description")
    @NotNull(message = "Description cannot be null!")
    private String description;

    @Column(name = "totalcost")
    @NotNull(message = "Total cost cannot be null!")
    @DecimalMin("0.0")
    private Long totalcost;

    @Column(name = "customerName")
    @NotNull(message = "Customer name cannot be null!")
    @Length(max = 80)
    private String customerName;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderEntry> orderEntries;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public LocalDate getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(LocalDate dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTotalcost() {
        return totalcost;
    }

    public void setTotalcost(Long totalcost) {
        this.totalcost = totalcost;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    
    
}