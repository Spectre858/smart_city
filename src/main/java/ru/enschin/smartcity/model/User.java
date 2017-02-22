package ru.enschin.smartcity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Andrey on 13.02.2017.
 */
@Entity
@Table(name = "users")
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

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
