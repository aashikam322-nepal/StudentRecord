
package com.example.coursereg.service;

import com.example.coursereg.entity.Course;
import com.example.coursereg.exception.CannotDeleteException;
import com.example.coursereg.repository.CourseRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository repo;
    public CourseService(CourseRepository repo) { this.repo = repo; }
    public Course save(Course c) { return repo.save(c); }
    public List<Course> findAll() { return repo.findAll(); }
    public void delete(Long id) {
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new CannotDeleteException(
                    "Cannot delete course. It is already enrolled by students."
            );
        }
    }

}
