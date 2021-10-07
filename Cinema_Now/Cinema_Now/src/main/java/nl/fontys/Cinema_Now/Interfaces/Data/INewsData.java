package nl.fontys.Cinema_Now.Interfaces.Data;

import nl.fontys.Cinema_Now.Modules.News;

import java.util.List;

public interface INewsData {
    List<News> getAllNews();
    News getANewsById(int id);
    boolean createNewPost(News news);
    boolean editPost(News news);
    boolean deletePost(int id);

}
