package com.akshay.predictive_control.service;

import com.akshay.predictive_control.model.WaterQuality;
import com.akshay.predictive_control.repository.WaterQualityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WaterQualityService {

    private final WaterQualityRepository repository;

    public WaterQualityService(WaterQualityRepository repository) {
        this.repository = repository;
    }

    public WaterQuality save(WaterQuality waterQuality) {
        return repository.save(waterQuality);
    }

    public List<WaterQuality> getAll() {
        return repository.findAll();
    }
}