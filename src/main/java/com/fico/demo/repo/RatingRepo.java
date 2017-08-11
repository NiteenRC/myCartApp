package com.fico.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fico.demo.model.Rating;

public interface RatingRepo extends JpaRepository<Rating, Integer> {

	Rating findByEmailId(String emailId);

	Rating findByEmailIdAndProductProductID(String emailId, int productId);
}
