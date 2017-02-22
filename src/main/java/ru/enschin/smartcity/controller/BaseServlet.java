package ru.enschin.smartcity.controller;

import ru.enschin.smartcity.dao.DaoManager;
import ru.enschin.smartcity.dao.PostgresDaoManager;

import javax.servlet.http.HttpServlet;

/**
 * Created by Andrey on 20.02.2017.
 */
public class BaseServlet extends HttpServlet {
    protected DaoManager daoManager = PostgresDaoManager.getInstance();

    protected static String PARAM_LOGIN = "login";
    protected static String PARAM_PASSWORD = "password";

}
