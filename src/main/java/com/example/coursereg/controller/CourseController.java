
package com.example.coursereg.controller;

import com.example.coursereg.entity.Course;
import com.example.coursereg.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @PostMapping
    public Course add(@RequestBody Course course) {
        return service.save(course);
    }

    @GetMapping
    public List<Course> all() {
        return service.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
