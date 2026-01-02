
package com.example.coursereg.service;

import com.example.coursereg.entity.Student;
import com.example.coursereg.exception.CannotDeleteException;
import com.example.coursereg.repository.StudentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repo;
    public StudentService(StudentRepository repo) { this.repo = repo; }
    public Student save(Student s) { return repo.save(s); }
    public List<Student> findAll() { return repo.findAll(); }
    public void delete(Long id) {
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new CannotDeleteException(
                    "Cannot delete student. It is already enrolled by course."
            );
        }
    }

}
