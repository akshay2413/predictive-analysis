package com.akshay.predictive_control.controller;

import com.akshay.predictive_control.service.PredictionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prediction")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping
    public String predict(@RequestBody String jsonData) {
        return predictionService.predict(jsonData);
    }
}