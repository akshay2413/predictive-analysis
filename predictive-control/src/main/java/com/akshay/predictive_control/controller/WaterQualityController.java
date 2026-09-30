package com.akshay.predictive_control.controller;

import com.akshay.predictive_control.model.WaterQuality;
import com.akshay.predictive_control.service.WaterQualityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/water-quality")
public class WaterQualityController {

    private final WaterQualityService service;

    public WaterQualityController(WaterQualityService service) {
        this.service = service;
    }

    @PostMapping
    public WaterQuality save(@RequestBody WaterQuality waterQuality) {
        return service.save(waterQuality);
    }

    @GetMapping
    public List<WaterQuality> getAll() {
        return service.getAll();
    }
}