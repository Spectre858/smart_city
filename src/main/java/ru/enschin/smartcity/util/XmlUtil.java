package ru.enschin.smartcity.util;


import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import java.io.StringWriter;

/**
 * Created by Andrey on 28.02.2017.
 */
public class XmlUtil {

    private XmlUtil() { }


    public static String objectToXml(Object object, Class cl) throws JAXBException {
        StringWriter result = new StringWriter();
        JAXBContext.newInstance(cl)
                .createMarshaller()
                .marshal(object, result);
        return result.toString();
    }
}
