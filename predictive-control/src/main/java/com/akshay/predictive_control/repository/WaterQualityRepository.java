package com.akshay.predictive_control.repository;

import com.akshay.predictive_control.model.WaterQuality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterQualityRepository
        extends JpaRepository<WaterQuality, Long> {
}