package nl.fontys.Cinema_Now.Services;

import nl.fontys.Cinema_Now.Modules.User;
import nl.fontys.Cinema_Now.Interfaces.Data.IUserData;
import nl.fontys.Cinema_Now.Interfaces.Services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private IUserData userData;
    @Autowired
    public UserService(IUserData userData)
    {
        this.userData = userData;
    }

    @Override
    public List<User> getAllUsers() {
        return userData.getAllUsers();
    }

    @Override
    public User getUserByID(int id) {
        return userData.getUserByID(id);
    }

    @Override
    public boolean addUser(User user) {
        return userData.addUser(user);
    }

    @Override
    public boolean editUser(User user) {
        return userData.editUser(user);
    }

    @Override
    public boolean deleteUser(int id) {
        return userData.deleteUser(id);
    }
}