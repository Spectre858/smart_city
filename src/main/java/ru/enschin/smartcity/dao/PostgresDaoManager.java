package ru.enschin.smartcity.dao;

import org.apache.log4j.Logger;
import org.hibernate.HibernateError;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import ru.enschin.smartcity.model.User;

import java.util.List;

/**
 * Created by Andrey on 13.02.2017.
 */
public class PostgresDaoManager implements DaoManager {
    private static final Logger LOGGER = Logger.getLogger(PostgresDaoManager.class);
    private static SessionFactory sessionFactory = null;
    private static PostgresDaoManager instance = null;

    private static void createSessionFactory() {
        sessionFactory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(User.class)
                .buildSessionFactory();
    }


        private PostgresDaoManager() {
        createSessionFactory();
    }

    public static PostgresDaoManager getInstance() {
        return instance == null ? new PostgresDaoManager() : instance;
    }

    @Override
    public User checkUser(String login, String password) {
        LOGGER.info("check user");
        Session session = sessionFactory.openSession();
        try {
            Query query = session.createQuery("FROM User WHERE login = :login AND password = :password");
            query.setParameter("login", login);
            query.setParameter("password", password);
            List resultList = query.list();

            if (resultList.isEmpty()) {
                LOGGER.info("user " + login + " " + password + " doesn't exist");
                return null;
            }
            return (User) resultList.get(0);
        } catch (HibernateError e) {
            LOGGER.warn("Some error while check user in db");
            return null;
        } finally {
            session.close();
        }
    }

    @Override
    public List<User> selectAllUsers() {
        LOGGER.info("select all users");
        Session session = sessionFactory.openSession();
        try {
            Query query = session.createQuery("FROM User");
            List resultList = query.list();

            if (resultList.isEmpty()) {
                System.out.println("DB is empty");
                return null;
            }
            return resultList;
        } catch (HibernateError e) {
            System.out.println("Some error");
            return null;
        } finally {
            session.close();
        }
    }

    @Override
    public void addUser(User user) {
        LOGGER.info("add user");
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            session.save(user);
            session.getTransaction().commit();
        } catch (HibernateError e) {
            System.out.println("Some error");
            session.getTransaction().rollback();
        } finally {
            session.close();
        }
    }



}
