package ru.enschin.smartcity.controller;

import org.apache.log4j.Logger;
import ru.enschin.smartcity.model.User;
import ru.enschin.smartcity.util.JsonUtil;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
        if (user == null) {
            user = new User();
        }

        resp.setContentType("text/json");
        resp.getWriter()
                .write(JsonUtil.userToJson(user));
    }
}
