package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ratings")
public class RatingsController {

	@Autowired
	private RatingsService ratingsService;


	@PostMapping
	public ResponseEntity submitRatings(@RequestBody Rating rating) {
		ratingsService.submitRatings(rating);
		return ResponseEntity.ok().build();
	}
	
}
