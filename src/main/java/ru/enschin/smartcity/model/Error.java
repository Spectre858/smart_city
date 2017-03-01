package ru.enschin.smartcity.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by Andrey on 28.02.2017.
 */
@XmlRootElement(name = "error")
public class Error implements Serializable {
    public enum Type {
        BUSSINESS,
        DATA_BASE
    }
    private Type type;
    private String message;

    public Error() {
    }

    public Error(Type type, String message) {
        this.type = type;
        this.message = message;
    }

    @XmlElement
    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    @XmlElement
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("Error [%s] - %s", type, message);
    }
}
