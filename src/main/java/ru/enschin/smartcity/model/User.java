package ru.enschin.smartcity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;

/**
 * Created by Andrey on 13.02.2017.
 */
@Entity
@Table(name = "users")
@XmlRootElement(name = "appData")
public class User implements Serializable{

    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @JsonProperty("login")
    @Column(name = "login")
    String login;

    @JsonProperty("password")
    @Column(name = "password")
    String password;

    @JsonProperty("email")
    @Column(name = "email")
    String email;

    @JsonProperty("firstname")
    @Column(name = "firstname")
    String firstname;

    @JsonProperty("lastname")
    @Column(name = "lastname")
    String lastname;

    @JsonProperty("surname")
    @Column(name = "surname")
    String surname;

    public User() {
    }

    public User(int id, String login, String password, String email, String firstname, String lastname, String surname) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.surname = surname;
    }

    @XmlTransient
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @XmlTransient
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @XmlTransient
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @XmlElement
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @XmlElement
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @XmlElement
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @XmlElement
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public String toString() {
        return String.format("{ id = %s, login = %s, firstname = %s, lastname = %s }", id, login, firstname, lastname);
    }
}
