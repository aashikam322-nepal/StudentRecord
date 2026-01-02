
package com.example.coursereg.service;

import com.example.coursereg.entity.*;
import com.example.coursereg.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepository repo;
    private final StudentRepository studentRepo;
    private final CourseRepository courseRepo;

    public EnrollmentService(EnrollmentRepository repo, StudentRepository studentRepo, CourseRepository courseRepo) {
        this.repo = repo;
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
    }

    public Enrollment enroll(Long studentId, Long courseId) {
        Enrollment e = new Enrollment();
        e.setStudent(studentRepo.findById(studentId).orElseThrow());
        e.setCourse(courseRepo.findById(courseId).orElseThrow());
        return repo.save(e);
    }

    public List<Enrollment> findAll() {
        return repo.findAll();
    }
}
