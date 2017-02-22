package ru.enschin.smartcity.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ru.enschin.smartcity.model.User;

/**
 * Created by Andrey on 20.02.2017.
 */
public class JsonUtil {

    private JsonUtil() { }

    public static String userToJson(User user) throws JsonProcessingException {
        return new ObjectMapper()
                .writeValueAsString(user);
    }
}
