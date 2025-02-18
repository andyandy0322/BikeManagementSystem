package backend.software.models;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Table
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Column(name = "name")
    private String name;

    @NotNull(message = "ID Number cannot be null")
    @Column(name = "idNumber")
    private String idNumber;

    @NotNull(message = "Classification cannot be null")
    @Length(min = 5, message = "Classification can only have a minimum of 5 characters")
    @Column(name = "classification")
    private String classification;

    @NotNull(message = "Contact Number cannot be null")
    @Column(name = "contactNumber")
    private String contactNumber;
    
    @Email(message = "Email must be a valid Email address")
    @Column(name = "email")
    private String email;

    @JsonBackReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "customer")
    private List<Orders> orders;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "customer")
    private List<Appointment> appointments;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
    
    

}
