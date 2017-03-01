package ru.enschin.smartcity.controller;

import org.apache.log4j.Logger;
import ru.enschin.smartcity.model.Error;
import ru.enschin.smartcity.model.User;
import ru.enschin.smartcity.util.JsonUtil;
import ru.enschin.smartcity.util.XmlUtil;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import java.io.IOException;

/**
 * Created by Andrey on 20.02.2017.
 */
public class PostUserServlet extends BaseServlet {
    private static final Logger LOGGER = Logger.getLogger(PostUserServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        LOGGER.info("do post");

        JsonReader reader = Json.createReader(req.getInputStream());
        JsonObject json = reader.readObject();
        reader.close();

        String login = json.getString(PARAM_LOGIN);
        String password = json.getString(PARAM_PASSWORD);
        LOGGER.info("from -> " + login + " " + password);

        User user = daoManager.checkUser(login, password);

        String result = null;
        try {

            if (user == null) {
               result = XmlUtil
                       .objectToXml(new Error(Error.Type.BUSSINESS, "Such user doesn't exist"), Error.class);
            } else {
                result = XmlUtil.objectToXml(user, User.class);
            }

            resp.setContentType("text/xml");
            resp.getWriter()
                    .write(result);
        } catch (JAXBException e) {
            LOGGER.warn("Can't write user to xml");
        }
    }
}
