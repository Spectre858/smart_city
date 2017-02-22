package ru.enschin.smartcity.controller;

import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Andrey on 20.02.2017.
 */
public class Servlet extends BaseServlet {
    private static final Logger LOGGER = Logger.getLogger(Servlet.class);


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        LOGGER.info("do get");
        String login = req.getParameter(PARAM_LOGIN);
        String password = req.getParameter(PARAM_PASSWORD);
        resp.setContentType("text/html; charset=UTF-8");
        resp.getWriter()
                .write(daoManager.checkUser(login, password).toString());
    }
}
