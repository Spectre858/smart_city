package ru.enschin.smartcity.dao;

import ru.enschin.smartcity.model.User;

import java.util.List;

/**
 * Created by Andrey on 13.02.2017.
 */
public interface DaoManager {
    User checkUser(String login, String password);

    List<User> selectAllUsers();

    void addUser(User user);
}
